require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Person = require("./models/person");
var morgan = require("morgan");
const app = express();

const mongo_db = mongodb+srv://elixir:SUD_Elixir22@cluster0.ab5knrj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms body=:body"
  )
);


app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.post("/api/persons", (request, response, next) => {
  const person = request.body;

  // Person.find({}).then((personas) => {
  //   console.log("BUSCADO: ", personas);
  // });

  // if (person_found) {
  //   return response.status(400).json({
  //     error: "Name already in phonebook!",
  //   });
  // }

  const newPerson = new Person({
    name: person.name,
    number: person.number,
  });

  newPerson
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});
app.get("/api/persons/:id", (request, response, next) => {
  const person_id = request.params.id;

  Person.findById(person_id)
    .then((person) => {
      response.json(person);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  const person_id = request.params.id;
  console.log("BODY: ", body);

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(person_id, person, { new: true })
    .then((personUpdate) => {
      console.log("PERSONA MODIFICADA: ", personUpdate);
      response.json(personUpdate);
    })
    .catch((error) => {
      console.log("ERROR: ", error);
      next(error);
    });
});


app.delete("/api/persons/:id", (request, response) => {
  const person_id = request.params.id;

  Person.findByIdAndDelete(person_id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => console.log("ERROR DELETE: ", error));
});

app.get("/info", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      const tamanio = persons.length;
      const fecha = new Date().toLocaleString();

      response.send(
        `<p>Phonebook has info for ${tamanio} people</p> <p>${fecha}</p>`
      );
    })
    .catch((error) => next(error));
});

const unkownEndpoint = (request, response) => {
  response.status(404).send({ error: "unkown endpoint" });
};

app.use(unkownEndpoint);

// MANEJO DE ERRORES
const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

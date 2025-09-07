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

app.post("/api/persons", (request, response) => {
  const person = request.body;

  if (!person.name) {
    return response.status(400).json({
      error: "Name is missing!",
    });
  }

  if (!person.number) {
    return response.status(400).json({
      error: "Number is missing!",
    });
  }

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

  newPerson.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const person_id = Number(request.params.id);

  const person = persons.find((person) => person.id === person_id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const person_id = Number(request.params.id);

  persons = persons.filter((person) => person.id !== person_id);

  response.status(204).end();
});

app.get("/info", (request, response) => {
  const tamanio = persons.length;
  const fecha = new Date().toLocaleString();

  response.send(
    `<p>Phonebook has info for ${tamanio} people</p> <p>${fecha}</p>`
  );
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

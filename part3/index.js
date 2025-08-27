const express = require("express");
const cors = require("cors");
var morgan = require("morgan");
const app = express();

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms body=:body"
  )
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
  {
    id: 5,
    name: "Fer Orquera",
    number: "39-55-666666",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.post("/api/persons", (request, response) => {
  const person = request.body;
  const new_id = Math.floor(Math.random() * (9999 - 10) + 10);

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

  const person_found = persons.find(
    (person_f) => person_f.name === person.name
  );

  if (person_found) {
    return response.status(400).json({
      error: "Name already in phonebook!",
    });
  }

  person.id = new_id;
  persons = persons.concat(person);

  response.json(person);
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

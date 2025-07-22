import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const addName = (event) => {
    event.preventDefault();

    const found = persons.find((person) => person.name === newName);

    if (found) {
      alert(`${newName} is already added to phonebook`);

      return;
    }

    const nameObject = {
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(nameObject));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterValue = (event) => {
    setFilterValue(event.target.value);
  };

  const personsToShow =
    filterValue === ""
      ? persons
      : persons.filter((person) => {
          const nameLowerCase = person.name.toLowerCase();

          return nameLowerCase.includes(filterValue.toLowerCase());
        });
  const Person = ({ person }) => {
    return (
      <>
        <div>
          {person.name} - {person.number}
        </div>
      </>
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        buscar: <input value={filterValue} onChange={handleFilterValue} />
      </div>
      <h2>Add</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </div>
  );
};

export default App;

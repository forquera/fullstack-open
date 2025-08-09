import { useState, useEffect } from "react";
import { Filter } from "./components/filter";
import { PersonForm } from "./components/personForm";
import { Persons } from "./components/persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const getPersons = () => {
    const promise = axios.get("http://localhost:3001/persons");

    promise.then((response) => {
      setPersons(response.data);
    });
  };

  useEffect(getPersons, []);

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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filterValue} handleFilterValue={handleFilterValue} />
      <h2>Add</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;

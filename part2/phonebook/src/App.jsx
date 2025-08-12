import { useState, useEffect } from "react";
import { Filter } from "./components/filter";
import { PersonForm } from "./components/personForm";
import { Persons } from "./components/persons";
import personService from "./services/persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const getPersons = () => {
    personService.getAll().then((persons) => setPersons(persons));
  };

  useEffect(getPersons, []);

  const addName = (event) => {
    event.preventDefault();

    const found = persons.find((person) => person.name === newName);

    const newObject = {
      name: newName,
      number: newNumber,
    };

    if (found) {
      if (
        window.confirm(
          `${newName} ya se encuentra en la agenda, quiere cambiar el numero por el nuevo?`
        )
      ) {
        personService
          .updatePerson(found.id, newObject)
          .then((personModified) => {
            const newPersons = persons.map((person) =>
              person.id != personModified.id ? person : personModified
            );
            setPersons(newPersons);
            setNewName("");
            setNewNumber("");
          });
      }
      return;
    }

    personService.create(newObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
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

  const handleEliminar = (id) => {
    if (window.confirm("Desea eliminar a la persona?")) {
      personService.deletePerson(id).then((personEliminada) => {
        const newPersons = persons.filter(
          (person) => person.id != personEliminada.id
        );
        setPersons(newPersons);
      });
    }
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
      <Persons persons={personsToShow} handleEliminar={handleEliminar} />
    </div>
  );
};

export default App;

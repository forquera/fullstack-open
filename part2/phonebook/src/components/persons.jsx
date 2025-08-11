const Person = ({ person, handleEliminar }) => {
  return (
    <>
      <div>
        {person.name} - {person.number} -{" "}
        <button
          onClick={() => {
            handleEliminar(person.id);
          }}
        >
          Eliminar
        </button>
      </div>
    </>
  );
};

export const Persons = ({ persons, handleEliminar }) => {
  return persons.map((person) => (
    <Person key={person.id} person={person} handleEliminar={handleEliminar} />
  ));
};

const Person = ({ person }) => {
  return (
    <>
      <div>
        {person.name} - {person.number}
      </div>
    </>
  );
};

export const Persons = ({ persons }) => {
  return persons.map((person) => <Person key={person.id} person={person} />);
};

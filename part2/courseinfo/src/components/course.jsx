const Header = (props) => {
  return (
    <>
      <h2>{props.name}</h2>
    </>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <>
      <p>
        {name} {exercises}
      </p>
    </>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

const Total = ({ parts }) => {
  const suma = parts.reduce(
    (acumulador, part) => acumulador + part.exercises,
    0
  );

  return (
    <>
      <h3>Number of exercises: {suma}</h3>
    </>
  );
};

export const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

import { useState } from "react";

const Boton = ({ onClick, text }) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  );
};

const EstadisticaLinea = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  );
};

const Estadisticas = ({ good, neutral, bad }) => {
  const sum = good + bad + neutral;
  const promedio = ((good - bad) / sum).toFixed(2);
  const positivo = ((good / sum) * 100).toFixed(2) + " %";

  return (
    <>
      <h1>statistics</h1>
      {sum === 0 ? (
        <p> No feedback given</p>
      ) : (
        <>
          <table>
            <tbody>
              <EstadisticaLinea text="good" value={good} />
              <EstadisticaLinea text="neutral" value={neutral} />
              <EstadisticaLinea text="bad" value={bad} />
              <EstadisticaLinea text="all" value={sum} />
              <EstadisticaLinea text="average" value={promedio} />
              <EstadisticaLinea text="positive" value={positivo} />
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Boton onClick={handleGood} text="good" />
      <Boton onClick={handleNeutral} text="neutral" />
      <Boton onClick={handleBad} text="bad" />
      <Estadisticas good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;

export const Country = ({ country }) => {
  console.log("PAIS: ", country);
  console.log("LENGUAJES: ", country.languages);
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital[0]}</div>
      <div>Area {country.area}</div>
      <h2>Languages</h2>
      <ul>
        {Object.entries(country.languages).map(([code, name]) => {
          return <li key={code}>{name}</li>;
        })}
      </ul>
      <div>
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>
    </>
  );
};

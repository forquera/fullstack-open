import serviceWeather from "../services/weather";
import { useState, useEffect } from "react";
import { Weather } from "./weather";

export const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const countryName = country.name.common;

  useEffect(() => {
    const getWeather = () => {
      serviceWeather
        .Weather({ countryName })
        .then((response) => setWeather(response));
    };

    getWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("TIEMPO: ", weather);

  return (
    <>
      <h1>{countryName}</h1>
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
      <h2>Weather in {countryName}</h2>
      {weather && <Weather weatherCountry={weather} />}
    </>
  );
};

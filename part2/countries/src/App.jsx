import { useState, useEffect } from "react";
import { CountriesList } from "./components/countriesList";
import { Country } from "./components/country";
import { Message } from "./components/message";
import serviceCountries from "./services/countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [country, setCountry] = useState(null);
  const [message, setMessage] = useState("");

  const getCountries = () => {
    serviceCountries.getCountries().then((countries) => {
      setCountries(countries);
    });
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (searchValue === "") {
      setCountriesToShow([]);
      setMessage("");
      setCountry(null);

      return;
    }

    if (searchValue != "") {
      const countriesFilter = countries.filter((country) => {
        const nameLowerCase = country.name.common.toLowerCase();

        return nameLowerCase.includes(searchValue.toLowerCase());
      });

      const tamanio = countriesFilter.length;

      if (tamanio > 10) {
        setCountry(null);
        setCountriesToShow([]);
        setMessage("Too many matches, specify another filter");
      }

      if (tamanio > 1 && tamanio < 11) {
        setCountry(null);
        setMessage("");
        setCountriesToShow(countriesFilter);
      }

      if (tamanio === 1) {
        setCountry(countriesFilter[0]);
        setCountriesToShow([]);
        setMessage("");
      }

      if (tamanio === 0) {
        setCountry(null);
        setCountriesToShow([]);
        setMessage("No se encuentran coincidencias");
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const handleInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <label>find countries:</label>
      <input value={searchValue} onChange={handleInput}></input>
      <Message message={message} />
      <CountriesList countries={countriesToShow} />
      {country && <Country country={country} />}
    </>
  );
}

export default App;

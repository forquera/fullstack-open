import { Country } from "./country";

export const CountriesList = ({ countries, setSearchValue }) => {
  const handleButtonShow = (name) => {
    setSearchValue(name);
  };

  return (
    <>
      <ul>
        {countries.map((country) => {
          return (
            <li key={country.name.common}>
              {country.name.common}{" "}
              <button onClick={() => handleButtonShow(country.name.common)}>
                Show
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

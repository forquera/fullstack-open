export const CountriesList = ({ countries }) => {
  return (
    <>
      <ul>
        {countries.map((country) => {
          return <li key={country.name.common}>{country.name.common}</li>;
        })}
      </ul>
    </>
  );
};

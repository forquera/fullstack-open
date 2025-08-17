export const Weather = ({ weatherCountry }) => {
  return (
    <>
      <div>Temperature {weatherCountry.main.temp} </div>
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${weatherCountry.weather.icon}@2x.png`}
          alt="icon weather"
        />
      </div>
      <div>Wind {weatherCountry.wind.speed} m/s </div>
    </>
  );
};

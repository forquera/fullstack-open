import axios from "axios";

const api_key = import.meta.env.VITE_API_WHEATER_KEY;
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const Weather = ({ countryName }) => {
  const url = `${baseUrl}?q=${countryName}&appid=${api_key}&units=metric`;
  const query = axios.get(url);

  return query.then((response) => response.data);
};

export default {
  Weather,
};

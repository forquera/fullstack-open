import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/";

const getCountries = () => {
  const query = axios.get(baseUrl + "all");
  return query.then((response) => response.data);
};

export default {
  getCountries,
};

const axios = require("axios");

//Info Api
const getAllCountries = async () => {
  const apiUrl = await axios.get("https://restcountries.com/v3/all");
  const Api = await apiUrl.data.map((el) => {
    return {
      id: el.cca3,
      name: el.name.common,
      capital: el.capital ? el.capital.join(", ") : "None",
      subregion: el.subregion,
      area: el.area,
      population: el.population,
      flags: el.flags[1],
    };
  });
  // .flat(2);
  return Api;
};

module.exports = {
  getAllCountries,
};

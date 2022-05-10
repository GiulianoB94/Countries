const initialState = { countries: [], detail: [], activities: [] };

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
      };

    case "GET_QUERY": {
      return {
        ...state,
        countries: action.payload,
      };
    }

    case "GET_DETAIL": {
      return {
        ...state,
        detail: action.payload,
      };
    }

    case "FILTER_BY_SUBREGION": {
      try {
        let filteredCont =
          action.payload !== "All"
            ? state.countries.filter(
                (country) => country.subregion === action.payload
              )
            : state.countries;

        return {
          ...state,
          countries: filteredCont,
        };
      } catch (err) {
        console.log("EEEEEEEEEEEEEH", err);
      }
    }

    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "asc"
          ? state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        countries: sortedArr,
      };

    case "ORDER_BY_POPULATION":
      let sortedArr2 =
        action.payload === "asc"
          ? state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return 1;
              }
              if (b.population > a.population) {
                return -1;
              }
              return 0;
            })
          : state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return -1;
              }
              if (b.population > a.population) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        countries: sortedArr2,
      };

    case "GET_ACTIVITIES":
      return {
        ...state,
        activities: action.payload,
      };

    case "FILTER_BY_ACTIVITY":
      let filteredCountries =
        action.payload === "All"
          ? state.countries
          : state.countries.filter(
              (e) =>
                e.activities &&
                e.activities.map((el) => el.name).includes(action.payload)
            );

      return {
        ...state,
        countries: filteredCountries,
      };

    case "CREATE_ACTIVITY": {
      return state;
    }

    default:
      return state;
  }
}
export default rootReducer;

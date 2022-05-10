import axios from "axios";

export function getCountries() {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/countries");
    let json = response.data;
    dispatch({ type: "GET_COUNTRIES", payload: json });
  };
}

export function getCountryQueries(name) {
  return async function (dispatch) {
    const response = await axios.get(
      "http://localhost:3001/countries?name=" + name
    );
    let json = response.data; //Data es porque está accediendo a la promesa de axios.
    dispatch({ type: "GET_QUERY", payload: json });
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    const response = await axios.get(` http://localhost:3001/countries/${id}`);
    let json = response.data;
    dispatch({ type: "GET_DETAIL", payload: json });
  };
}

export let filterBySubregion = (payload) => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: "FILTER_BY_SUBREGION",
        payload: payload,
      });
    } catch (error) {
      console.log("AAAAAAAAAAAAH", error);
    }
  };
};

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByPopulation(payload) {
  return {
    type: "ORDER_BY_POPULATION",
    payload,
  };
}

export function getActivities() {
  return async (dispatch) => {
    let activities = await axios.get("http://localhost:3001/activities");
    return dispatch({ type: "GET_ACTIVITIES", payload: activities.data });
  };
}

export function filterActivity(payload) {
  try {
    return async (dispatch) => {
      return dispatch({ type: "FILTER_BY_ACTIVITY", payload: payload });
    };
  } catch (err) {
    console.log(err);
  }
}

export function createActivity(payload) {
  return async (dispatch) => {
    try {
      let newActivity = await axios.post(
        "http://localhost:3001/activities",
        payload
      );

      return dispatch({
        type: "CREATE_ACTIVITY",
        payload: newActivity.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

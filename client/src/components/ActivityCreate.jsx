import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createActivity, getCountries } from "../actions";
import "./ActivityCreate.css";
import SearchBar from "./SearchBar";

export default function ActivityCreate() {
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state);
  const [error, setError] = useState({});

  // useState de los inputs
  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  //Validaciones
  let validation = () => {
    let error = {};
    if (!input.name) {
      error.name = "Field required";
    } else if (!input.difficulty) {
      error.difficulty = "Field required";
    } else if (!input.duration) {
      error.duration = "Field required";
    } else if (!input.season) {
      error.season = "Field required";
    } else if (!input.countries) {
      error.countries = "Field required";
    }
    return error;
  };

  //Handlers
  function handleOnChange(e) {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
    setError(validation({ ...input, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createActivity(input));
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: [],
    });

    alert("Activity Added! Thank you for playing GG WP");
  }

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div className="containerPost">
      <header>
        <h1 className="headerTitle">
          Henry <br /> Countries
        </h1>
        <SearchBar />
        <img
          src="https://media-public.canva.com/BSeNc/MADhH8BSeNc/3/t.png"
          alt="world"
          className="headerLogo"
        />
      </header>
      <div className="mainscreen">
        <div className="rightsidePost">
          <form onSubmit={(e) => handleSubmit(e)}>
            <h1 className="titlePost">Create Activity</h1>
            <label className="labelCardPost">Activity</label>
            <input
              onChange={(e) => handleOnChange(e)}
              type="text"
              className="inputbox"
              name="name"
            />{" "}
            {error.name && <p>{error.name}</p>}
            <label className="labelCardPost">Difficulty</label>
            <select onChange={(e) => handleOnChange(e)} name="difficulty">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <label className="labelCardPost">Duration</label>
            <input
              onChange={(e) => handleOnChange(e)}
              type="text"
              className="inputbox"
              name="duration"
            />{" "}
            {error.duration && <p>{error.duration}</p>}
            <label className="labelCardPost">Season</label>
            <select onChange={(e) => handleOnChange(e)}>
              <option value="">None</option>
              <option value="Summer">Summer</option>
              <option value="Winter">Winter</option>
              <option value="Spring">Spring</option>
              <option value="Autumn">Autum</option>
            </select>
            <div className="selectedCont">
              <div className="selected"></div>
            </div>
            <label className="labelCardPost">Select Country/Cuntries</label>
            <select onChange={(e) => handleOnChange(e)}>
              {countries &&
                countries.map((el) => {
                  return <option value={el.name}>{el.name}</option>;
                })}
            </select>
            <button type="submit" className="button">
              Submit
            </button>
          </form>
        </div>
        <Link to="/home">
          <button className="backButton">Back</button>
        </Link>
      </div>
    </div>
  );
}

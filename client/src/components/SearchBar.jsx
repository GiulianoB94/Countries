import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryQueries } from "../actions";
import "./SearchBar.css";
export default function SearchBar() {
  let dispatch = useDispatch();
  let [name, setName] = useState(" ");

  //Definimos los handlers (Gestiona eventos)
  let handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value); //e.target.value es lo que se escribe en la barra(valor que recibe el input)
    console.log(name);
  };

  let handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getCountryQueries(name));
  };
  return (
    <div className="wrap">
      <div className="search">
        <input
          onChange={(e) => handleInputChange(e)}
          type="text"
          placeholder="Search"
          className="input"
        />
        <button
          className="searchButton"
          onClick={(e) => handleOnSubmit(e)}
          type="submit"
        >
          Go
        </button>
      </div>
    </div>
  );
}

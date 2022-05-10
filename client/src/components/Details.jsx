import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetail } from "../actions";
import Loader from "./Loader";

export default function Details() {
  let dispatch = useDispatch(); //Para traer la acción
  const { id } = useParams(); //El id es el que se le pasa cuando seleccionamos un país
  const country = useSelector((state) => state.detail); // useSelector es para llamar al estado definido en el reducer (detail: []) y modificarlo
  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  if (country) {
    return (
      <div>
        <header>
          <h1>COUNTRIES</h1>
        </header>
        <div>
          <h6>{country.id}</h6>
          <h1>{country.name}</h1>
          <img src={country.flags} alt="Not found" />
          <h2>{country.capital}</h2>
          <h3>{country.subregion}</h3>
          <h3>{country.area}</h3>
          <h3>{country.population}</h3>
          <h2>{country?.activity}</h2>
        </div>
        <footer>Footer</footer>
      </div>
    );
  } else {
    return <Loader />;
  }
}

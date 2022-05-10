import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  filterActivity,
  filterBySubregion,
  getActivities,
  getCountries,
  orderByName,
  orderByPopulation,
} from "../actions";
import Card from "./Card";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import "./Home.css";

export default function Home() {
  const countries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(9);
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const paged = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };

  const [order, setOrder] = useState("");

  const dispatch = useDispatch(); // Para llamar acciones de Redux
  useEffect(() => {
    //Escucha diferentes parámetros para renderizar cuando haya cambios en las funciones(getCountries(), getActivities())
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  let handleFilterCont = (e) => {
    e.preventDefault();
    dispatch(filterBySubregion(e.target.value));
  };

  let handlerReset = (e) => {
    e.preventDefault();
    dispatch(getCountries());
  };

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    // setCurrentPage(1);
    setOrder(`ordenado ${e.target.value}`);
  }

  function handlePop(e) {
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value));
    setOrder(`ordenado ${e.target.value}`);
  }

  function handleActivity(e) {
    e.preventDefault();
    dispatch(filterActivity(e.target.value));
  }

  let subregions = countries?.map((el) => el.subregion);
  const allSubregions = [...new Set(subregions)];

  return (
    <div className="background">
      <header>
        <h1 className="headerTitle">
          Henry <br /> Countries
        </h1>
        <img
          src="https://media-public.canva.com/BSeNc/MADhH8BSeNc/3/t.png"
          alt="world"
          className="headerLogo"
        />
      </header>

      <div className="filtCont">
        <select
          className="select"
          onChange={(e) => handleFilterCont(e)}
          id="filter"
        >
          <option value="">All Continents</option>
          {allSubregions?.map((el) => {
            return <option value={el}>{el}</option>;
          })}
        </select>
        <select className="select" onChange={(e) => handleSort(e)} id="filter">
          <option value="">Alphabetic</option>
          <option value="asc">Ascendent</option>
          <option value="desc">Descendent</option>
        </select>
        <select className="select" onChange={(e) => handlePop(e)} id="filter">
          <option value="">Population</option>
          <option value="asc">Ascendent</option>
          <option value="desc">Descendent</option>
        </select>
        <select
          className="select"
          onChange={(e) => handleActivity(e)}
          id="filter"
        >
          <option value="All">Activities</option>
          {activities &&
            activities.map((el) => {
              return (
                <option key={el.id} value={el.name}>
                  {el.name}
                </option>
              );
            })}
        </select>
        <button className="buttonFilt" onClick={(e) => handlerReset(e)}>
          Reset
        </button>
        <SearchBar />
      </div>

      <div className="card">
        {currentCountries?.map((el) => {
          return (
            <Link className="link" to={"/countries/" + el.id}>
              <Card
                key={el.id}
                name={el.name}
                image={el.flags}
                subregion={el.subregion}
              />
            </Link>
          );
        })}
      </div>
      <footer>
        <button className="buttonFiltAct">
          <Link className="link" to="/post">
            Create Activity
          </Link>
        </button>
        <Pagination
          allCountries={countries.length}
          paged={paged}
          currentPage={currentPage}
          countriesPerPage={countriesPerPage}
        />
      </footer>
    </div>
  );
}

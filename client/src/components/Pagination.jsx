import React from "react";
import "./Pagination.css";

export default function Paged({ countriesPerPage, allCountries, paged }) {
  let pageNumbers = [];

  for (let i = 1; i < Math.ceil(allCountries / countriesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className="numbers" key={number}>
              <button className="abtn" onClick={() => paged(number)}>
                {number}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
}

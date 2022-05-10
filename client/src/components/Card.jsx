import React from "react";
import "./Card.css";

export default function Card({ image, name, subregion }) {
  return (
    <div className="cont">
      <div className="gridContainer">
        <div className="grid">
          <img className="cardImg" src={image} alt="Not found" />
          <h3 className="textCard">{name}</h3>
          <h3 className="textCard">{subregion}</h3>
        </div>
      </div>
    </div>
  );
}

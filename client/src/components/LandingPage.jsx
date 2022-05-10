import React from "react";
import { Link } from "react-router-dom";
import Home from "./Home";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landingBody">
      <div className="landingCard">
        <h1 className="title">Henry Countries</h1>
        <Link className="hover" to="/home" element={<Home />}>
          <button className="button">Get in</button>
        </Link>
      </div>
    </div>
  );
}

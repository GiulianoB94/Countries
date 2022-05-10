import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Details from "./components/Details";
import ActivityCreate from "./components/ActivityCreate";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/post" element={<ActivityCreate />} />
        <Route path="/countries/:id" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;

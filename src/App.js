import React from "react";
import "./App.css";
import Homepage from "./components/Homepage";
import OurArt from "./components/OurArt";
import Location from "./components/Location";
import { Routes, Route, Link } from "react-router-dom";
import logo from "./logo.png"; // Ensure this path is correct

function App() {
  return (
    <div>
      <nav>
        {/* Logo container */}
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        {/* Navigation links */}
        <div className="nav-links">
          <Link to="/" className="nav-item">Homepage</Link>
          <Link to="/ourart" className="nav-item">OurArt</Link>
          <Link to="/location" className="nav-item">Location</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/ourart/*" element={<OurArt />} /> {/* Ensure * is used to nest sub-routes */}
        <Route path="/location" element={<Location />} />
      </Routes>
    </div>
  );
}

export default App;

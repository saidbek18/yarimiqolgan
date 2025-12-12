// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import NewLogin from "./NewLogin.jsx";
import Home from "./HOME.JSX";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/new-login" element={<NewLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Login />} /> {/* Default sahifa */}
      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Company from "./components/Company";
import Register from "./components/Register";
import Jobseeker from "./components/Jobseeker";
import Reset from "./components/Reset";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/company" element={<Company />} />
        <Route path="/jobseeker" element={<Jobseeker />} />
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </>
  );
}

export default App;

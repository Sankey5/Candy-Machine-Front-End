import React from "react";
// react router
import { BrowserRouter, Routes, Route } from "react-router-dom";
// CSS
import "./css/App.css";
// Components
import NavagationBar from "./components/Navbar";
import Home from "./components/Home";
import Error from "./components/Error";

function App() {
  return (
    <BrowserRouter>
      <NavagationBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./pages/Navbar";
import MainPage from "./pages/MainPage";
import HotelPage from "./pages/HotelPage";
import "./App.css";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/hotel/:id" element={<HotelPage />} />
      </Routes>
    </>
  );
};

export default App;

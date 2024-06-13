import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./pages/Navbar";
import MainPage from "./pages/MainPage";
import HotelPage from "./pages/HotelPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/hotel/:id" element={<HotelPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;

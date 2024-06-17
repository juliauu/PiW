import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./pages/Navbar";
import MainPage from "./pages/MainPage";
import HotelPage from "./pages/HotelPage";
import FavoritesPage from "./pages/FavoritesPage";
import BrowsePage from "./pages/BrowsePage";
import RentPage from "./pages/RentPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FavoritesProvider } from "./contexts/favoritesContext";
import "./App.css";

const App = () => {
  return (
    <FavoritesProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/hotel/:id" element={<HotelPage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/rent" element={<RentPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
      <ToastContainer />
    </FavoritesProvider>
  );
};

export default App;

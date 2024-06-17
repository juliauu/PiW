import React, { createContext, useReducer } from "react";

const initialState = {
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
};

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      const updatedFavoritesAdd = [...state.favorites, action.payload];
      localStorage.setItem("favorites", JSON.stringify(updatedFavoritesAdd));
      return { ...state, favorites: updatedFavoritesAdd };

    case "REMOVE_FAVORITE":
      const updatedFavoritesRemove = state.favorites.filter(
        (hotel) => hotel.id !== action.payload.id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavoritesRemove));
      return { ...state, favorites: updatedFavoritesRemove };

    default:
      return state;
  }
};

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  return (
    <FavoritesContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};

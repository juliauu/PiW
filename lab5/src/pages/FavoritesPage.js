import React, { useContext } from "react";
import { FavoritesContext } from "../contexts/favoritesContext";
import { NavLink } from "react-router-dom";
import { getHotelMainImage } from "../utils/getHotelMainImage";

const FavoritesPage = () => {
  const { state } = useContext(FavoritesContext);

  return (
    <section id="hero" className="grid hotel-section">
      <p className="title-large hotel-title gap">Your Favorite Hotels</p>
      <article className="hero-details">
        {state.favorites.length === 0 ? (
          <p className="text-middle gap">You have no favorite hotels.</p>
        ) : (
          state.favorites.map((hotel) => (
            <div key={hotel.id} className="favorite-hotel-card">
              <NavLink
                to={`/hotel/${hotel.id}`}
                className="title-middle nav-link"
              >
                {hotel.name}
              </NavLink>

              <div
                className="image hotel-image gap"
                style={{
                  backgroundImage: `url(${getHotelMainImage(hotel.id)})`,
                }}
              ></div>
            </div>
          ))
        )}
      </article>
    </section>
  );
};

export default FavoritesPage;

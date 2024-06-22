import React from "react";
import hotels from "../data/hotels";
import arrow from "../Assets/Arrow.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getHotelMainImage } from "../utils/getHotelMainImage";

const MainPage = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const filteredHotels = hotels.filter((hotel) => {
    const searchString =
      `${hotel.name} ${hotel.location} ${hotel.description}`.toLowerCase();
    return searchString.includes(query.toLowerCase());
  });

  return (
    <>
      <section id="hero" className="grid hero-section">
        <article className="hero-details">
          <p className="title-large">Your tranquillity oasis awaits</p>
          <p className="text-middle">
            TranquilTravels is designed to help you find a serene retreat for
            your next holidays. With us searching for the hotels nestled amidst
            picturesque landscapes is easier than ever.
          </p>
          <div className="hero-cards">
            <div className="image card-image">
              <p className="chip">
                New hotels <img src={arrow} alt="Arrow" />
              </p>
            </div>
            <div className="image card-image">
              <p className="chip">
                Best reviews <img src={arrow} alt="Arrow" />
              </p>
            </div>
          </div>
        </article>
        <div className="image hero-image-container"></div>
      </section>
      <section id="browse" className="browse-section">
        <p className="title-middle">Explore the hotels</p>
        <input
          className="searchbar"
          placeholder="Search by hotel name, place etc."
          value={query}
          onChange={handleSearch}
        />
        <section className="grid hotel-cards">
          {filteredHotels.map((hotel) => (
            <article key={hotel.id} className="hotel-card">
              <div
                className="image card-image"
                style={{
                  backgroundImage: `url(${getHotelMainImage(hotel.id)})`,
                }}
              >
                <p className="chip">{hotel.location}</p>
              </div>
              <p className="text-middle">{hotel.name}</p>
              <p className="text-small">{hotel.description}</p>
              <div className="hotel-card-footer">
                <p className="text-middle">{"★".repeat(hotel.rating)}</p>
                <p className="text-middle">{hotel.price}</p>
              </div>
              <Link to={`/hotel/${hotel.id}`} className="nav-link">
                <button className="button primary">
                  View Offer <img src={arrow} alt="Arrow" />
                </button>
              </Link>
            </article>
          ))}
        </section>
      </section>
      <section id="rent" className="footer grid">
        <div className="image card-image"></div>
        <article className="footer-details">
          <p className="title-large">Rent with us!</p>
          <p className="text-middle">
            If you’re a hotel or an apartment owner who’s looking to reach more
            customers you can now rent your property with TranquilTravels.
          </p>
          <button className="button secondary">
            Learn more <img src={arrow} alt="Arrow" />
          </button>
        </article>
      </section>
    </>
  );
};

export default MainPage;

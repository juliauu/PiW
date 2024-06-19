import React from "react";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/firebaseConfig";
import arrow from "../Assets/Arrow.svg";
import { Link } from "react-router-dom";

const BrowsePage = () => {
  const [hotels, setHotels] = useState([]);
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const filteredHotels = hotels.filter((hotel) => {
    const searchString =
      `${hotel.name} ${hotel.location} ${hotel.description}`.toLowerCase();
    return searchString.includes(query.toLowerCase());
  });

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "hotels"));
        const hotelsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHotels(hotelsData);
      } catch (error) {
        console.error("Error fetching hotels: ", error);
      }
    };

    fetchHotels();
  }, []);

  return (
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
            <div className="image card-image">
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
  );
};

export default BrowsePage;

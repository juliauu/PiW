import React from "react";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/firebaseConfig";
import arrow from "../Assets/Arrow.svg";
import { Link } from "react-router-dom";
import { getHotelMainImage } from "../utils/getHotelMainImage";

const BrowsePage = () => {
  const [hotels, setHotels] = useState([]);
  const [query, setQuery] = useState("");
  const [sortAttribute, setSortAttribute] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleSort = (e) => {
    setSortAttribute(e.target.value);
  };

  const extractPrice = (priceString) => {
    const priceMatch = priceString.match(/(\d+)/);
    return priceMatch ? parseInt(priceMatch[0], 10) : 0;
  };

  const filteredHotels = hotels
    .filter((hotel) => {
      const searchString =
        `${hotel.name} ${hotel.location} ${hotel.description}`.toLowerCase();
      return searchString.includes(query.toLowerCase());
    })
    .sort((a, b) => {
      if (!sortAttribute) return 0;
      if (sortAttribute === "price") {
        return extractPrice(a.price) - extractPrice(b.price);
      }
      if (sortAttribute === "rating") {
        return b.rating - a.rating;
      }
      if (sortAttribute === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortAttribute === "location") {
        return a.location.localeCompare(b.location);
      }
      return 0;
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
      <select
        className="sort-dropdown"
        value={sortAttribute}
        onChange={handleSort}
      >
        <option value="">Sort by</option>
        <option value="price">Price</option>
        <option value="rating">Rating</option>
        <option value="name">Name</option>
        <option value="location">Location</option>
      </select>
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
  );
};

export default BrowsePage;

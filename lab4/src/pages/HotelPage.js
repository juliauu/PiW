import React from "react";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../data/firebaseConfig";
import { useLocation } from "react-router-dom";
import { getHotelMainImage } from "../utils/getHotelMainImage";

const HotelPage = () => {
  const location = useLocation();
  const id = location.pathname.split("/").pop();
  const [hotel, setHotel] = useState([]);

  useEffect(() => {
    const fetchHotel = async () => {
      const docRef = doc(db, "hotels", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setHotel(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchHotel();
  }, [id]);

  if (!hotel) {
    return <p>Hotel not found</p>;
  }

  const openDialog = () => {
    const dialog = document.getElementById("dialog");
    dialog.showModal();
  };

  const closeDialog = () => {
    const dialog = document.getElementById("dialog");
    dialog.close();
  };

  return (
    <section id="hero" className="grid hotel-section">
      <p className="title-large hotel-title gap">{hotel.name}</p>
      <div
        className="image hotel-main-image"
        style={{ backgroundImage: `url(${getHotelMainImage(id)})` }}
      >
        <p className="chip">Add to favorites ♡</p>
      </div>
      <article className="hotel-details">
        <p className="text-small">
          <span className="text-bold">Location:</span> {hotel.location}
        </p>
        <p className="text-small">
          <span className="text-bold">Local category:</span>{" "}
          {"★".repeat(hotel.rating)}
        </p>
        <p className="text-small">
          <span className="text-bold">Price:</span> {hotel.price}/night
        </p>
        <p className="text-small text-bold">Description:</p>
        <p className="text-small">{hotel.description}</p>
        <p className="gap">
          <button className="button primary" onClick={openDialog}>
            Contact ✉
          </button>
        </p>
        <dialog id="dialog">
          <form method="dialog">
            <div className="close-button">
              <button className="button" onClick={closeDialog}>
                ✕
              </button>
            </div>
            <p className="title-large">Contact</p>
            <p className="gap">You're contacting the {hotel.name} hotel</p>
            <textarea name="textarea" id="textarea" rows="8"></textarea>
            <div className="dialog-buttons">
              <button className="button" id="closeDialogButton">
                Cancel
              </button>
              <button className="button primary">Send ✉</button>
            </div>
          </form>
        </dialog>
        <div className="hero-cards">
          <div
            className="image hotel-image"
            style={{ backgroundImage: `url(${getHotelMainImage(id)})` }}
          ></div>
          <div
            className="image hotel-image"
            style={{ backgroundImage: `url(${getHotelMainImage(id)})` }}
          ></div>
        </div>
      </article>
    </section>
  );
};

export default HotelPage;

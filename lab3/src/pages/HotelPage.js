import React from "react";
import { useParams } from "react-router-dom";
import hotels from "../data/hotels";
import { getHotelMainImage } from "../utils/getHotelMainImage";

const HotelPage = () => {
  const { id } = useParams();
  const hotel = hotels.find((h) => h.id === parseInt(id));

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
        style={{ backgroundImage: `url(${getHotelMainImage(hotel.id)})` }}
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
            style={{ backgroundImage: `url(${getHotelMainImage(hotel.id)})` }}
          ></div>
          <div
            className="image hotel-image"
            style={{ backgroundImage: `url(${getHotelMainImage(hotel.id)})` }}
          ></div>
        </div>
      </article>
    </section>
  );
};

export default HotelPage;

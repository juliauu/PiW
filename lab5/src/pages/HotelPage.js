import React, { useEffect, useState, useContext } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../data/firebaseConfig";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FavoritesContext } from "../contexts/favoritesContext";
import { getHotelMainImage } from "../utils/getHotelMainImage";

const HotelPage = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [message, setMessage] = useState("");
  const { state, dispatch } = useContext(FavoritesContext);

  useEffect(() => {
    const fetchHotel = async () => {
      const docRef = doc(db, "hotels", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setHotel({ ...docSnap.data(), id });
      } else {
        console.log("No such document!");
      }
    };

    fetchHotel();
  }, [id]);

  const isFavorite = state.favorites.some((favHotel) => favHotel.id === id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch({ type: "REMOVE_FAVORITE", payload: { ...hotel, id } });
    } else {
      dispatch({ type: "ADD_FAVORITE", payload: { ...hotel, id } });
    }
  };

  const openDialog = () => {
    if (!auth.currentUser) {
      toast.error("Login to contact the hotel");
      return;
    }
    const dialog = document.getElementById("dialog");
    dialog.showModal();
  };

  const closeDialog = () => {
    const dialog = document.getElementById("dialog");
    dialog.close();
  };

  const handleSendEmail = () => {
    if (!auth.currentUser) {
      toast.error("Login to send mail");
      return;
    }
    if (message === "") {
      toast.error("The message cannot be empty");
      return;
    }
    toast.success("SENT");
    setMessage("");
    closeDialog();
  };

  if (!hotel) {
    return <p>Hotel not found</p>;
  }

  return (
    <section id="hero" className="grid hotel-section">
      <p className="title-large hotel-title gap">{hotel.name}</p>
      <div
        className="image hotel-main-image"
        style={{ backgroundImage: `url(${getHotelMainImage(id)})` }}
      >
        <p className="chip" onClick={handleFavoriteClick}>
          {isFavorite ? "Remove from favorites ♥" : "Add to favorites ♡"}
        </p>
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
            <textarea
              name="textarea"
              id="textarea"
              rows="8"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="textarea-padding"
            ></textarea>
            <div className="dialog-buttons">
              <button
                className="button"
                id="closeDialogButton"
                onClick={closeDialog}
              >
                Cancel
              </button>
              <button
                className="button primary"
                type="button"
                onClick={handleSendEmail}
              >
                Send ✉
              </button>
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

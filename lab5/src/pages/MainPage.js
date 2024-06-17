import React from "react";
import arrow from "../Assets/Arrow.svg";
import BrowsePage from "./BrowsePage";
import RentPage from "./RentPage";

const MainPage = () => {
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

      <BrowsePage />
      <RentPage />
    </>
  );
};

export default MainPage;

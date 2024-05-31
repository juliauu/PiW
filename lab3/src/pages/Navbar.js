import React from "react";
import logo from "../Assets/logo.svg";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed-navigation">
      <img className="logo" src={logo} alt="Logo" />
      <ul className="nav-links">
        <li>
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/#browse" className="nav-link">
            Browse
          </NavLink>
        </li>
        <li>
          <a href="#rent" className="nav-link">
            Rent with us
          </a>
        </li>
        <li>
          <a href="#signup" className="nav-link">
            Sign up
          </a>
        </li>
        <button className="button primary">Log in</button>
      </ul>
      <button className="button primary hidden">Menu</button>
    </nav>
  );
};

export default Navbar;

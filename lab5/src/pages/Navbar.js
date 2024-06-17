import React, { useState } from "react";
import logo from "../Assets/logo.svg";
import { NavLink } from "react-router-dom";
import { logout, useUser } from "../data/userService";
import LoginModal from "../data/LoginModal";
import SignupModal from "../data/SignupModal";

const Navbar = () => {
  const user = useUser();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  return (
    <nav className="fixed-navigation">
      <NavLink to="/" className="nav-link">
        <img className="logo" src={logo} alt="Logo" />
      </NavLink>
      <ul className="nav-links">
        <li>
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/favorites" className="nav-link">
            Favorites
          </NavLink>
        </li>
        <li>
          <NavLink to="/browse" className="nav-link">
            Browse
          </NavLink>
        </li>
        <li>
          <a href="rent" className="nav-link">
            Rent with us
          </a>
        </li>
        {user ? (
          <>
            <li>{user.email}</li>
            <button className="button primary" onClick={logout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/"
                className="nav-link"
                onClick={() => setIsSignupModalOpen(true)}
              >
                Sign up
              </NavLink>
            </li>
            <button
              className="button primary"
              onClick={() => setIsLoginModalOpen(true)}
            >
              Log in
            </button>
          </>
        )}
      </ul>
      <button className="button primary hidden">Menu</button>
      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
      <SignupModal
        isOpen={isSignupModalOpen}
        setIsOpen={setIsSignupModalOpen}
      />
    </nav>
  );
};

export default Navbar;

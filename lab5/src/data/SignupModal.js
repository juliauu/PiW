import React, { useState } from "react";
import Modal from "react-modal";
import { signupDefault } from "../data/userService";

const SignupModal = ({ isOpen, setIsOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      await signupDefault(email, password);
      setIsOpen(false);
      setEmail("");
      setPassword("");
      console.log("User signed up");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      className="modal"
      style={{ overlay: { background: "#50614a9c" } }}
    >
      <form onSubmit={handleSignup}>
        <p className="title-middle">Sign Up</p>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div className="modal-buttons">
          <button type="submit" className="button primary">
            Sign Up
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SignupModal;

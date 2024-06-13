import React, { useState } from "react";
import Modal from "react-modal";
import { login, loginDefault } from "../data/userService";

const LoginModal = ({ isOpen, setIsOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleLogin = async () => {
    try {
      await login();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailLogin = async () => {
    try {
      await loginDefault(email, password);
      setIsOpen(false);
      setEmail("");
      setPassword("");
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEmailLogin();
        }}
      >
        <p className="title-middle">Log in</p>
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
            Login with Email
          </button>
        </div>
        <div className="modal-buttons">
          <button onClick={handleGoogleLogin} className="button primary">
            Login with Google
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default LoginModal;

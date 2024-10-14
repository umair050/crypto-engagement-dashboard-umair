"use client";

import React, { useState } from "react";
import "./Page.css"; // Assuming you'll create a CSS file named Page.css

const Page: React.FC = () => {
  const [username, setUsername] = useState<string>(""); // Type string for state
  const [password, setPassword] = useState<string>(""); // Type string for state

  // Define event type for input change
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  // Define event type for form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username" className="label">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            className="input"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={handlePasswordChange}
            className="input input-error"
          />
          <p className="error-text">Please choose a password.</p>
        </div>
        <div className="actions">
          <button type="submit" className="submit-btn">
            Sign In
          </button>
          <a href="#" className="forgot-link">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default Page;

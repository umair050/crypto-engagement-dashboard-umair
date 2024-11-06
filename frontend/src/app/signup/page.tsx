"use client";

import React, { useState } from "react";
import "./Page.css"; // Assuming the same CSS for styling

const Page: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Handlers for input change
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  // Simulating API call on form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const signUpData = {
      username,
      email,
      password,
    };

    try {
      const response = await fetch("your-api-endpoint-url-here", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });

      if (response.ok) {
        console.log("Registration successful!");
        // Handle success (e.g., redirect to login page or show success message)
      } else {
        console.error("Registration failed");
        // Handle error (e.g., show error message)
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
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
            className="input"
          />
        </div>
        <div className="actions">
          <button type="submit" className="submit-btn">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;

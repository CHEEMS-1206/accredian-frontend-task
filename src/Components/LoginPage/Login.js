import React from "react";
import { Typography, TextField, Button } from "@mui/material";

import "./Login.css";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const moveTo = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    // Validate password (password: 8 characters)
    const isPasswordValid = password.length === 8;
    if (!isPasswordValid) {
      alert("Password must be 8 characters.");
      return;
    }

    const formData = {
      username,
      password,
    };

    try {
      console.log(formData)
      const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const { token } = await response.json();
        alert("Logged in successfully! Token:");

        // Save the token and user details in local storage for further use
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        moveTo("/");
      } else {
        alert("Failed to log in.");
        // Handle other status codes or errors
      }
    } catch (error) {
      alert("Error:", error);
      // Handle network errors or exceptions
    }
  };

  function moveToRegisterPage() {
    moveTo("/register");
    console.log("Move to register page.");
  }
  return (
    <div className="login-page">
      {/* Section 1: Login */}
      <div className="form-container">
        <Typography variant="h4" id="company-name">
          Accredian
        </Typography>
        <Typography variant="h5" id="login-desc">
          Login To Your Account...
        </Typography>
        <form noValidate autoComplete="off">
          <TextField
            id="username"
            className="text-fields"
            label="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            margin="normal"
          />
          <TextField
            className="text-fields"
            id="password"
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            margin="normal"
          />
          <Button variant="contained" id="login-btn" onClick={loginHandler}>
            Login
          </Button>
        </form>
      </div>

      {/* Section 2: Sign Up */}
      <div className="reg-btn-container">
        <Typography variant="h4" id="login-page-reg-header">
          New here?
        </Typography>
        <Typography variant="body1" id="login-page-reg-desc">
          Sign up and befriend yourself with immense ocean of opportunities.
        </Typography>
        <Button
          onClick={moveToRegisterPage}
          variant="contained"
          id="reg-redirect-btn"
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Login;

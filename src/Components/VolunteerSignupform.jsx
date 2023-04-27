import React, { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { UserContext } from "../context/UserContext.jsx";
import { useAuth } from "../providers/AuthProvider.jsx";

import { Button } from "@mui/material";
import "../styles/App.css";

export function VolunteerSignupform(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const { userState, setUserState } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const isValid = await login(username, password);
    if (!isValid) {
      setErrorMessage("Incorrect username or password");
    } else {
      navigate(-1);
    }
  };

  const signUpVolunteer = async (event) => {
    event.preventDefault(); //prevents from rerouting to /? (legacy functionality for sending form data in browsers)
    try {
      const response = await fetch("api/authenticate/volunteer/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: userState.firstName,
          lastName: userState.lastName,
          email: userState.email,
          password: password,
        }),
      });
      if (!response.ok) {
        console.log("You encountered an error");
        const error = await response.json();
        setErrorMessage(error.message);
      } else {
        const volunteerData = await response.json();
        // console.log("response data is: ", volunteerData);
        // console.log(`token is ${volunteerData.token}`);
        setUserState({ ...userState, token: volunteerData.token });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log("user context", userState);

  return (
    <div className="form-container">
      <form className="form" onSubmit={signUpVolunteer}>
        <h3>{props.title}</h3>
        <br />
        <div className="form-group">
          <label htmlFor="name">First Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your first name"
            name="name"
            value={userState.firstName}
            required
            onChange={(e) =>
              setUserState({ ...userState, firstName: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            placeholder="Enter your last name"
            name="lastName"
            value={userState.lastName}
            required
            onChange={(e) =>
              setUserState({ ...userState, lastName: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            placeholder="Enter your email"
            name="email"
            value={userState.email}
            required
            onChange={(e) =>
              setUserState({ ...userState, email: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            placeholder="Enter a password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="form-group">
          <Button className="form-submit-btn" type="submit" title="submit">
            Sign Up
          </Button>
          <br />
          <p>
            Already have an account?&nbsp;
            <a
              onClick={() => {
                props.setSigninSelected(true);
                props.setSignupSelected(false);
              }}
            >
              Log In
            </a>
          </p>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
      </form>
      {userState.token != null && (
        <Navigate to="/profile/volunteer" replace={true} />
      )}
    </div>
  );
}
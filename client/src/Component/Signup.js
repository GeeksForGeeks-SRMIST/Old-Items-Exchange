import React, { useState, useEffect } from "react";
import { Link, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import "./signup.css";
import Axios from "axios";
import { localsName } from "ejs";
const Signup = () => {
  const [email, updateEmail] = useState(" ");
  const [password, updatePassword] = useState("");
  const [phone, updatePhone] = useState(" ");
  const [name, updateName] = useState(" ");
  const [address, updateAddress] = useState(" ");
  const [userId, updateUserId] = useState(null);
  const [location, updateLocation] = useState("");

  const emailhandle = (e) => {
    e.preventDefault();
    updateEmail(e.target.value);
  };
  const passwordhandle = (e) => {
    e.preventDefault();
    updatePassword(e.target.value);
  };
  const phonehandle = (e) => {
    e.preventDefault();
    updatePhone(e.target.value);
  };
  const namehandle = (e) => {
    e.preventDefault();
    updateName(e.target.value);
  };
  const addresshandle = (e) => {
    e.preventDefault();
    updateAddress(e.target.value);
  };
  const locationhandle = (e) => {
    e.preventDefault();
    updateLocation(e.target.value);
  };

  const deliver = async (e) => {
    e.preventDefault();
    await Axios.post("/api/users", {
      name,
      email,
      password,
      address,
      location,
      phone,
    })
      .then((res) => {
        return (
          localStorage.setItem("token", res.data.token),
          localStorage.setItem("userId", res.data.userId),
          updateUserId(localStorage.getItem("token"))
        );
      })
      .catch((err) => console.log(err));
  };

  /* 
  const signup = (e) => {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((resp) => console.log(resp))
      .catch((err) => updateMessage(err.message));
  };

  const logout = () => {
    fire.auth().signOut();
  }; */

  if (userId) {
    return <Redirect to="/"></Redirect>;
  }

  /*   if (token) {
    return <Home token={token}></Home>;
  } */
  return (
    <div>
      <div>
        <ul className="nav justify-content-center">
          <li className="nav-item">
            {/* <img
              src={
              style={{ justifyContent: "right" }}
              className="image"
            ></img> */}
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link active">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link active">
              Login
            </Link>
          </li>
        </ul>
      </div>
      <div className="background">
        <div className="container-sm shadow-lg p-3 mb-5 bg-white rounded ">
          <div className=" p-3 mb-5 ">
            <form onSubmit={deliver}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email Address</label>
                <input
                  type="email"
                  name="updateEmail"
                  className="form-control"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={emailhandle}
                ></input>
                <small className="form-text text-muted">
                  we'll never share your email with anyone!
                </small>
              </div>
              <div>
                <label>Password</label>
                <input
                  value={password}
                  name="updatePassword"
                  type="password"
                  className="form-control"
                  aria-describedby="emailHelp"
                  onChange={passwordhandle}
                ></input>
              </div>
              <div>
                <label>Phone No.</label>
                <input
                  value={phone}
                  name="updatePhone"
                  type="Number"
                  className="form-control"
                  aria-describedby="emailHelp"
                  onChange={phonehandle}
                ></input>
              </div>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  name="updateAddress"
                  className="form-control"
                  aria-describedby="emailHelp"
                  onChange={namehandle}
                  value={name}
                ></input>
              </div>
              <div>
                <label>address</label>
                <input
                  value={address}
                  type="text"
                  name="updateAddress"
                  className="form-control"
                  aria-describedby="emailHelp"
                  onChange={addresshandle}
                ></input>
              </div>
              <div>
                <label>location</label>
                <input
                  value={location}
                  type="text"
                  name="updateLocation"
                  className="form-control"
                  aria-describedby="emailHelp"
                  onChange={locationhandle}
                ></input>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ marginTop: "20px" }}
              >
                signup
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

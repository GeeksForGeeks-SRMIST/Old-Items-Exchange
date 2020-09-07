import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

import Home from "./Home";
import "./signup.css";
import Axios from "axios";
import { localsName } from "ejs";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.signup = this.signup.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      email: "",
      password: "",
      name: "",
      phone: "",
      address: "",
      location: "",
      valid: false,
      userId: "",
    };
  }
  signup = async (e) => {
    e.preventDefault();
    await Axios.post("/api/users", {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      address: this.state.address,
      location: this.state.location,
      phone: this.state.phone,
    })
      .then((res) =>
        this.setState({ valid: res.data.token, userId: res.data.userId })
      )
      .catch((err) => console.log(err));
  };
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  render() {
    if (this.state.valid) {
      localStorage.setItem("token", this.state.valid);
      localStorage.setItem("userId", this.state.userId);
    }
    if (this.state.valid) return <Redirect to="/"></Redirect>;

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
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                    value={this.state.email}
                    onChange={this.handleChange}
                  ></input>
                  <small className="form-text text-muted">
                    we'll never share your email with anyone!
                  </small>
                </div>
                <div>
                  <label>Password</label>
                  <input
                    value={this.state.password}
                    name="password"
                    type="password"
                    className="form-control"
                    aria-describedby="emailHelp"
                    onChange={this.handleChange}
                  ></input>
                </div>
                <div>
                  <label>Phone No.</label>
                  <input
                    value={this.state.phone}
                    name="phone"
                    type="Number"
                    className="form-control"
                    aria-describedby="emailHelp"
                    onChange={this.handleChange}
                  ></input>
                </div>
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    aria-describedby="emailHelp"
                    onChange={this.handleChange}
                    value={this.state.name}
                  ></input>
                </div>
                <div>
                  <label>address</label>
                  <input
                    value={this.state.address}
                    type="text"
                    name="address"
                    className="form-control"
                    aria-describedby="emailHelp"
                    onChange={this.handleChange}
                  ></input>
                </div>
                <div>
                  <label>location</label>
                  <input
                    value={this.state.location}
                    type="text"
                    name="location"
                    className="form-control"
                    aria-describedby="emailHelp"
                    onChange={this.handleChange}
                  ></input>
                </div>
                <button
                  type="submit"
                  onClick={this.signup}
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
  }
}
export default Signup;

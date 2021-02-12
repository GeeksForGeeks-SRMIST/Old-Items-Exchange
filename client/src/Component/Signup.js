import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

import Home from "./Home";
import "./signup.css";
import img from "./cart-removebg-preview.png";
import img1 from './WhatsApp Image 2020-09-18 at 17.35.32.jpeg';
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
      <div className='signup'>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="/">Stud-Shop</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
              <li className="nav-item"> 
                <a href="/"><i className="fas fa-home"></i></a>
              </li>
              <li className="nav-item"> 
                <a href="/login">Login</a>
              </li>
            </ul>
          </div>
        </nav>
        <img src={img} className='mobSignup'/>
        <div className="row">
          <div className="col-lg-3  bg-white rounded ">
            <div className='card'>
              <form>
                <div className="form-group">
                  <h3>Sign-Up</h3>
                  <label htmlFor="exampleInputEmail1"><i class=" fa-lg fas fa-envelope"></i></label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Email-Address"
                    value={this.state.email}
                    onChange={this.handleChange}
                  ></input>
                  <small className="form-text text-muted">
                    we'll never share your email with anyone!
                  </small>
                  <label><i class=" fa-lg fas fa-key"></i></label>
                  <input
                    value={this.state.password}
                    name="password"
                    type="password"
                    placeholder="Password (Min Length-6)"
                    className="form-control"
                    aria-describedby="emailHelp"
                    onChange={this.handleChange}
                  ></input>
                  <label><i class=" fa-lg fas fa-user"></i></label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    aria-describedby="emailHelp"
                    onChange={this.handleChange}
                    value={this.state.name}
                  ></input>
                  <label><i class=" fa-lg fas fa-phone"></i>.</label>
                  <input
                    value={this.state.phone}
                    name="phone"
                    type="Number"
                    placeholder="Ph No. (Ex-98765XXXXX)"
                    className="form-control"
                    aria-describedby="emailHelp"
                    onChange={this.handleChange}
                  ></input>
                  <label><i class=" fa-lg fas fa-home"></i></label>
                  <input
                    value={this.state.address}
                    type="text"
                    name="address"
                    className="form-control"
                    placeholder="Address"
                    aria-describedby="emailHelp"
                    onChange={this.handleChange}
                  ></input>
                  <label><i class=" fa-lg fas fa-map-marked"></i></label>
                  <input
                    value={this.state.location}
                    type="text"
                    name="location"
                    className="form-control"
                    placeholder="Location (City)"
                    aria-describedby="emailHelp"
                    onChange={this.handleChange}
                  ></input>
                </div>
                <button
                  type="submit"
                  onClick={this.signup}
                  className="btn btn-primary"
                >
                  Sign-Up&nbsp;&nbsp;<i className=" fas fa-check"></i>
                </button>
              </form>
            </div>
          </div>
          <div className='col-lg-8'>
            <img src={img} className='signupImg'/>
          </div>
        </div>
      </div>
    );
  }
}
export default Signup;

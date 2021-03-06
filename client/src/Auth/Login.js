import React, { Component, useEffect } from "react";
import { Route, Redirect, Link } from "react-router-dom";

import "./Login.css";
import imgB from "./WhatsApp Image 2020-09-07 at 11.17.14.jpeg";
import img from "./cart-removebg-preview.png";
import Axios from "axios";
class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      email: "",
      password: "",
      errMessage: " ",
      valid: false,
      userId: "",
    };
  }

  errMessage = " ";
  login = async (e) => {
    e.preventDefault();
    /*  fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        console.log(u);
      })
      .catch((err) => {
        this.setState({ errMessage: err.message });
      }); */

    await Axios.post("/api/auth", {
      email: this.state.email,
      password: this.state.password,
    })
      .then((res) =>
        this.setState({ valid: res.data.token, userId: res.data.userId })
      )
      .catch((err) => {
        alert("Wrong Credentials Entered");
        window.location.reload();
        console.log(err);
      });

    console.log(localStorage.getItem("token"));
  };
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  /*   change() {
    this.setState({ valid: true });
  } */
  render() {
    if (this.state.valid) {
      localStorage.setItem("token", this.state.valid);
      localStorage.setItem("userId", this.state.userId);
    }
    if (this.state.valid){
       return <Redirect to="/"></Redirect>; 
    }
    return (
      <div className="image1">
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
                <a href="/signup">Sign Up</a>
              </li>
            </ul>
          </div>
        </nav>
        <img src={img} className='mobSignup'/>
        <div className="row">
          <div className="desk col-lg-3 login bg-white rounded">
            
              <h3>Log-In</h3>
              <form>
                <label><i className="fas fa-envelope fa-lg"></i></label> 
                <input
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  id="email"
                  name="email"
                  placeholder="Email-Address"
                  onChange={this.handleChange}
                  value={this.state.email}
                />
                <label><i className="fas fa-key fa-lg"></i></label> 
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  aria-describedby="emailHelp"
                  onChange={this.handleChange}
                  id="password"
                  placeholder="Password (Min Length-6)"
                  value={this.state.password}
                />
                <button onClick={this.login} className="btn btn-primary">
                  Login&nbsp;&nbsp;<i className="fas fa-sign-in-alt"></i>
                </button>
                <Link to="/signup">New User? Signup here!</Link>
              </form>

              <p className="para">{this.state.errMessage}</p>
          </div>         
        <div className='col-lg-8'>
            <img src={img} className='signupImg'/>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;

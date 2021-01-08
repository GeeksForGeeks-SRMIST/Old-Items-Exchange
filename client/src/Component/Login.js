import React, { Component, useEffect } from "react";
import { Route, Redirect, Link } from "react-router-dom";

import "./Login.css";
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
      .catch((err) => console.log(err));

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
    if (this.state.valid) return <Redirect to="/"></Redirect>;
    return (
      <div className="image1">
        <div className="container-sm">
          <div className=" lg-cards shadow-lg rounded">
            <div className="p-3 mb-5">
              <form>
                <h6 class="head">Enter your email</h6>
                <input
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                  value={this.state.email}
                />
                <br></br>
                {/* <br></br> */}
                <h6 class="head">Enter your password</h6>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  aria-describedby="emailHelp"
                  onChange={this.handleChange}
                  id="password"
                  placeholder="Password"
                  value={this.state.password}
                />
                <br></br>
                <button onClick={this.login} className="btn btn-primary">
                  Login
                </button>
                <br></br>
                <br></br>

                <Link to="/signup">New user? Signup here!</Link>
              </form>

              <p className="para">{this.state.errMessage}</p>
            </div>
          </div>
        </div>
        <footer>
        <div className='row'>
          <div className='col-sm-12 col-lg-5 about-us'>
            <a href="">About Us</a>
          </div>
          <div className='col-sm-12 col-lg-1'>
            <a href="">Developers</a>
          </div>
          <div className='col-sm-12 col-lg-1'>
            <a href="">Contact Us</a>
          </div>
          <div className='col-sm-12 col-lg-3 brand'>
            <a href=""><i className="fab fa-instagram fa-lg"></i>&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a href=""><i className="fab fa-facebook-square fa-lg"></i>&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a href=""><i className="fab fa-linkedin fa-lg"></i>&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a href=""><i className="fab fa-youtube fa-lg"></i></a>
          </div>
        </div>
      </footer>
      </div>
    );
  }
}
export default Login;

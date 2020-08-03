import React, { Component } from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import Home from '../Component/Home';
import fire from '../config/fire';
import Signup from '../Component/Signup';
import './Login.css';
import Axios from 'axios';
class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      email: '',
      password: '',
      errMessage: ' ',
      valid: false,
    };
  }

  errMessage = ' ';
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

    await Axios.post('/api/Auth', {
      email: this.state.email,
      password: this.state.password,
    })
      .then(
        (res) => localStorage.setItem('token', res.data.token),
        this.setState({ valid: true })
      )
      .catch((err) => console.log(err));

    console.log(localStorage.getItem('token'));
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
    if (this.state.valid) return <Redirect to='/'></Redirect>;
    return (
      <div className='image1'>
        <div className='container-sm'>
          <div className='contanier-sm shadow-lg p-3 mb-5 bg-white rounded'>
            <div className='p-3 mb-5'>
              <form>
                <input
                  type='email'
                  className='form-control'
                  aria-describedby='emailHelp'
                  id='email'
                  name='email'
                  placeholder='Email'
                  onChange={this.handleChange}
                  value={this.state.email}
                />
                <br></br>
                <br></br>
                <input
                  name='password'
                  type='password'
                  className='form-control'
                  aria-describedby='emailHelp'
                  onChange={this.handleChange}
                  id='password'
                  placeholder='Password'
                  value={this.state.password}
                />
                <br></br>
                <button onClick={this.login} className='btn btn-primary'>
                  Login
                </button>
                <br></br>
                <br></br>

                <Link to='/signup'>new user? Signup here!</Link>
              </form>

              <p className='para'>{this.state.errMessage}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;

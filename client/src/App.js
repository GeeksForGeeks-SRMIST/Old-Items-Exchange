import React, { Component } from "react";
import Login from "./Auth/Login";
import { Switch, Route } from "react-router-dom";
import Signup from "./Component/Signup";
import Home from "./Component/Home";
import Form from "./Component/form";
class App extends Component {
  state = {
    user: {},
  };
  /* 
  componentDidMount() {
    this.authtListener();
  }
  authtListener() {
    // to store data passed through login and is triggered when componentDidMount changes
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  } */
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/form" component={Form}></Route>
        </Switch>
        {/*  {this.state.user ? <Signup /> : <Form></Form>} */}
      </div>
    );
  }
}

export default App;

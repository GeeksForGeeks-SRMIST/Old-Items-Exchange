import React, { Component } from "react";
import Login from "./Auth/Login";
import { Switch, Route } from "react-router-dom";
import Signup from "./Component/Signup";
import Home from "./Component/Home";
import Form from "./Component/form";
import ProfilePage from "./Component/UserProfile";
import Findpage from "./Component/findpage";
import ItemPage from "./Component/itemPage";
/* import FileUpload from "./Component/Fileupload"; */
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
          {localStorage.getItem("token") ? (
            <Route path="/profile" component={ProfilePage}></Route>
          ) : null}
          <Route path="/signup" component={Signup}></Route>
          <Route path="/search" exact component={Findpage} />
          <Route path="/item/:id" component={ItemPage} />
          <Route path="/:id" component={Form}></Route>
          {/* Route path="/fileupload" component={FileUpload}></Route> */}
        </Switch>
        {/*  {this.state.user ? <Signup /> : <Form></Form>} */}
      </div>
    );
  }
}

export default App;

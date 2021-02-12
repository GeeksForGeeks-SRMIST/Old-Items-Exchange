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
          <Route path="/login" exact component={Login}></Route>
          <Route path="/search/:id" component={Findpage} />
          <Route path="/search/" component={Findpage} />
          {localStorage.getItem("token") ? (
            <Route path="/profile" exact component={ProfilePage}></Route>
          ) : null}
          {localStorage.getItem("token") ? (
            <Route path="/:id" exact component={Form}></Route>
          ) : null}
          <Route path="/signup" exact component={Signup}></Route>
          <Route path="/item/:id" component={ItemPage} />

          {/* Route path="/fileupload" component={FileUpload}></Route> */}
        </Switch>
        {/*  {this.state.user ? <Signup /> : <Form></Form>} */}
      </div>
    );
  }
}

export default App;

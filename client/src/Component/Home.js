import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import { sign } from "jsonwebtoken";
export const Home = () => {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  //card disply

  let card = null;
  card = (
    <div className="row row-cols-1 row-cols-md-3">
      <div className="col mb-4">
        <div className="card">
          <img
            src="https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_1280.jpg"
            className="card-img-top"
          />
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            creative nhi mein jo pehle aya dimaag mein daal dia !
          </p>
        </div>
      </div>
      <div className="col mb-4">
        <div className="card">
          <img
            src="https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_1280.jpg"
            className="card-img-top"
          />
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            creative nhi mein jo pehle aya dimaag mein daal dia !
          </p>
        </div>
      </div>
      <div className="col mb-4">
        <div className="card">
          <img
            src="https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_1280.jpg"
            className="card-img-top"
          />
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            creative nhi mein jo pehle aya dimaag mein daal dia !
          </p>
        </div>
      </div>
      <div className="col mb-4">
        <div className="card">
          <img
            src="https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_1280.jpg"
            className="card-img-top"
          />
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            creative nhi mein jo pehle aya dimaag mein daal dia !
          </p>
        </div>
      </div>
      <div className="col mb-4">
        <div className="card">
          <img
            src="https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_1280.jpg"
            className="card-img-top"
          />
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            creative nhi mein jo pehle aya dimaag mein daal dia !
          </p>
        </div>
      </div>
      <div className="col mb-4">
        <div className="card">
          <img
            src="https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_1280.jpg"
            className="card-img-top"
          />
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            creative nhi mein jo pehle aya dimaag mein daal dia !
          </p>
        </div>
      </div>
    </div>
  );
  let extras = null;
  useEffect((e) => {}, [extras]);

  //navbar

  if (localStorage.getItem("token") || localStorage.getItem("userId")) {
    extras = (
      <div>
        <Link className="navbar-brand" to="/profile">
          Profile
        </Link>
        <Link className="navbar-brand" onClick={logout}>
          Logout
        </Link>
      </div>
    );
  }

  let signup = null;

  if (!localStorage.getItem("token") || localStorage.getItem("userId")) {
    signup = (
      <div>
        <Link className="navbar-brand" to="/signup">
          Signup
        </Link>
      </div>
    );
  }
  //footer
  let footer = null;
  footer = <div></div>;
  return (
    <div>
      <nav class="navbar navbar-light  bg-light">
        <Link className="navbar-brand" to="/login">
          Login
        </Link>
        {signup}
        {extras}
      </nav>
      <div className="container-fluid">
        <h1 className="recomendation">RECOMENDED</h1>
        {card}
      </div>
    </div>
  );
};
export default Home;

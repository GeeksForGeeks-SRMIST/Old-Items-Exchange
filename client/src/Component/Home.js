import React, { useEffect, useState, Fragment } from "react";
import firebase from "firebase";

import { Link } from "react-router-dom";
import Select from "react-select";
import Axios from "axios";
import "./home.css";
export const Home = () => {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  const [product, updateProduct] = useState([]);
  const [type, updateType] = useState("");

  const userItem = async () => {
    await Axios.get("/api/item/list")
      .then((res) => updateProduct(res.data.items))
      .catch((err) => console.log(err));
  };
  const options = [
    { value: "Automobile", label: "Automobile" },
    { value: "Furniture", label: "Furniture" },
    { value: "Others", label: "Others" },
    { value: "Electronic Appliances", label: "Electronic Appliances" },
    { value: "Gaming Equipment", label: "Gaming Equipment" },
  ];

  const MyComponent = () => (
    <Select
      label="category"
      options={options}
      onChange={(value) => updateType(value.value)}
    />
  );
  let card;

  /*   let imageLoader = (imageUrl) => {
    let storage = firebase.storage();
    let pathReference = storage.refFromURL(imageUrl);
    storage
      .child(imageUrl)
      .getDownloadURL()
      .then((url) => updateUrl(url));
  }; */

  {
    type
      ? (card = product
          .filter((data) => data.category === type)
          .map((data) => (
            <div key={Math.random() * 1000} className=" cards">
              <div className="card">
                <img
                  src={
                    data.images[0] ||
                    "https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_1280.jpg"
                  }
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title" style={{ fontWeight: 600 }}>
                    <button className="money">
                      <i className="fas fa-money-bill-wave"></i>
                    </button>
                    <label className="desc"> &#8377; {data.price}</label>
                  </h5>
                  <h5 className="capitalize" style={{ fontWeight: 600 }}>
                    <button className="money">
                      <i className="fas fa-luggage-cart"></i>
                    </button>
                    <label className="desc">{data.item_name}</label>
                  </h5>
                  <p style={{ textAlign: "center" }}>Owner Details</p>
                  <p className="capitalize">
                    <i className="fas fa-user"></i> : {data.author}
                  </p>
                  <p>
                    <i className="fas fa-phone-alt"></i> : {data.number}
                  </p>
                  <p className="location">
                    <i className="fas fa-map-marked-alt"></i> {data.location}
                  </p>
                </div>
              </div>
            </div>
          )))
      : (card = product.slice(0, 8).map((data) => (
          <div key={Math.random() * 1000} className=" cards">
            <div className="card">
              <img
                src={
                  data.images[0] ||
                  "https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_1280.jpg"
                }
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: 600 }}>
                  <button className="money">
                    <i className="fas fa-money-bill-wave"></i>
                  </button>
                  <label className="desc"> &#8377; {data.price}</label>
                </h5>
                <h5 className="capitalize" style={{ fontWeight: 600 }}>
                  <button className="money">
                    <i className="fas fa-luggage-cart"></i>
                  </button>
                  <label className="desc">{data.item_name}</label>
                </h5>
                <p style={{ textAlign: "center" }}>Owner Details</p>
                <p className="capitalize">
                  <i className="fas fa-user"></i> : {data.author}
                </p>
                <p>
                  <i className="fas fa-phone-alt"></i> : {data.number}
                </p>
                <p className="location">
                  <i className="fas fa-map-marked-alt"></i> {data.location}
                </p>
              </div>
            </div>
          </div>
        )));
  }
  let extras = null;
  useEffect((e) => {
    userItem();
  }, []);

  //navbar

  if (localStorage.getItem("token") || localStorage.getItem("userId")) {
    extras = (
      <li>
        <Link className="nav-item" to="/profile">
          Profile
        </Link>
        <Link className="nav-item" onClick={logout}>
          Logout
        </Link>
      </li>
    );
  }

  let signup = null;

  if (!localStorage.getItem("token") || !localStorage.getItem("userId")) {
    signup = (
      <li>
        <Link className="navbar-item" to="/signup">
          Signup
        </Link>
      </li>
    );
  }
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="/search">
                <i className="fas fa-search"></i>
              </a>
            </li>
            <li className="nav-item">
              <div className="component">{MyComponent()}</div>
            </li>

            <li className="nav-item">{signup}</li>
            <li className="nav-item">
              <Link to="/login">
                Login <i className="fas fa-sign-in-alt"></i>
              </Link>
            </li>
            <li className="nav-item">{extras}</li>
          </ul>
        </div>
      </nav>

      <div className="container-fluid">
        <div>
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_1280.jpg"
                  className="d-block w-100"
                  alt="..."
                ></img>
              </div>
              <div className="carousel-item">
                <img
                  src="https://i.ytimg.com/vi/2ue-nVWN6kI/maxresdefault.jpg"
                  className="d-block w-100"
                  alt="..."
                ></img>
              </div>
              <div className="carousel-item">
                <img
                  src="https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_1280.jpg"
                  className="d-block w-100"
                  alt="..."
                ></img>
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleControls"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only"></span>
            </a>

            <a
              className="carousel-control-prev"
              href="#carouselExampleControls"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only"></span>
            </a>
          </div>
        </div>
        <h1 className="recomendation">Recommended</h1>
        <div className=" content">{card}</div>
      </div>
    </Fragment>
  );
};
export default Home;

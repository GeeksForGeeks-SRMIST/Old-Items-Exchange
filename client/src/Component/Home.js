import React, { useEffect, useState, Fragment } from "react";
import firebase from "firebase";
import { Link } from "react-router-dom";
import Select from "react-select";
import Axios from "axios";
import "./home.css";
import "./footer.css";

import logo from "./tac2.png";
import logo1 from "./r4-removebg-preview.png";
import logo2 from "./601ba887d04c6.png";
export const Home = () => {
  const [product, updateProduct] = useState([]);
  const [type, updateType] = useState("");
  const [query,setQuery] = useState("");
  const userItem = async () => {
    await Axios.get("/api/item/list")
      .then((res) => updateProduct(res.data.items))
      .catch((err) => console.log(err));
  };

  /* options created for react-select library which is used to filter products */

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
  /* implementation of each product cards by using map  */

  {
    type
      ? (card = product
          .filter((data) => data.category === type)
          .map((data) => (
            <div key={Math.random() * 1000} className=" cards ">
              <Link to={ `/item/${data._id}`}>
                <div className="card rounded itemC">
                  <img
                    src={
                      data.images[0] ||
                      "https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_1280.jpg"
                    }
                    className="card-img-top rounded"
                  />
                  <div className="card-body">
                    
                    <h5 className="capitalize" style={{ fontWeight: 600 }}>
                      <button className="money">
                        <i className="fas fa-luggage-cart"></i>
                      </button>
                      <label className="desc">{data.item_name}</label>
                    </h5>
                    <h5 className="card-title" style={{ fontWeight: 600 }}>
                      <button className="money">
                        <i className="fas fa-money-bill-wave"></i>
                      </button>
                      <label className="desc"> &#8377; {data.price}</label>
                    </h5>
                    <p className="location">
                      <i className="fas fa-map-marked-alt"></i> {data.location}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          )))
      : (card = product.slice(0, 8).map((data) => (
          <div key={Math.random() * 1000} className=" cards">
            <Link to={`/item/${data._id}`}>
              <div className="card rounded itemC">
                <img
                  src={
                    data.images[0] ||
                    "https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_1280.jpg"
                  }
                  className="card-img-top rounded"
                />
                <div className="card-body">
                  
                  <h5 className="capitalize" style={{ fontWeight: 600 }}>
                    <button className="money">
                      <i className="fas fa-luggage-cart"></i>
                    </button>
                    <label className="desc">{data.item_name}</label>
                  </h5>
                  <h5 className="card-title" style={{ fontWeight: 600 }}>
                    <button className="money">
                      <i className="fas fa-money-bill-wave"></i>
                    </button>
                    <label className="desc"> &#8377; {data.price}</label>
                  </h5>
                  <p className="location">
                    <i className="fas fa-map-marked-alt"></i> {data.location}
                  </p>
                </div>
              </div>
            </Link>
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
      <li className="nav-item">
        <Link to="/profile">Profile</Link>
      </li>
    );
  }

  let signup = null;

  /* to load each image from database to carousel */

  let image = product.map((res) => (
    <div key={res._id} className="carousel-item">
      <img
        src={
          res.images[0] ||
          "https://i.ytimg.com/vi/2ue-nVWN6kI/maxresdefault.jpg"
        }
        className="d-block w-100"
        alt="..."
      ></img>
    </div>
  ));
  let furniture = product
    .filter((res) => res.category == "Furniture")
    .map((res) => (
      <div key={res._id} className="carousel-item">
      
        <div class="card bg-dark text-white">
          <img class="card-img d-block w-100" 
            src={
              res.images[0] ||
              "https://i.ytimg.com/vi/2ue-nVWN6kI/maxresdefault.jpg"
            }
             alt="Card image" />
          <div class="card-img-overlay">
            <h5 class="card-title" style={{textTransform:"capitalize"}}>{res.item_name}</h5>
          </div>
        </div>
      </div>
    ));
  let automobile = product
    .filter((res) => res.category == "Automobile")
    .map((res) => (
      <div key={res._id} className="carousel-item">
        <div class="card bg-dark text-white">
          <img class="card-img d-block w-100" 
            src={
              res.images[0] ||
              "https://i.ytimg.com/vi/2ue-nVWN6kI/maxresdefault.jpg"
            }
             alt="Card image" />
          <div class="card-img-overlay">
            <h5 class="card-title" style={{textTransform:"capitalize"}}>{res.item_name}</h5>
          </div>
        </div>
      </div>
    ));
  let electronic_appliance = product
    .filter((res) => res.category == "Electronic Appliances")
    .map((res) => (
      <div key={res._id} className="carousel-item">
        <div class="card bg-dark text-white">
          <img class="card-img d-block w-100" 
            src={
              res.images[0] ||
              "https://i.ytimg.com/vi/2ue-nVWN6kI/maxresdefault.jpg"
            }
             alt="Card image" />
          <div class="card-img-overlay">
            <h5 class="card-title" style={{textTransform:"capitalize"}}>{res.item_name}</h5>
          </div>
        </div>
      </div>
    ));
  let gaming = product
    .filter((res) => res.category == "Gaming Equipment")
    .map((res) => (
      <div key={res._id} className="carousel-item">
        <div class="card bg-dark text-white">
          <img class="card-img d-block w-100" 
            src={
              res.images[0] ||
              "https://i.ytimg.com/vi/2ue-nVWN6kI/maxresdefault.jpg"
            }
             alt="Card image" />
          <div class="card-img-overlay">
            <h5 class="card-title" style={{textTransform:"capitalize"}}>{res.item_name}</h5>
          </div>
        </div>
      </div>
    ));
  /* to authorise user using tokens */

  if (!localStorage.getItem("token") || !localStorage.getItem("userId")) {
    signup = (
      <li className="nav-item">
        <Link className="nav-item" to="/signup">
          Signup
        </Link>

        <Link className="nav-item" to="/login">
          Login
        </Link>
      </li>
    );
  }
  const getQuery = (e) =>{
    setQuery(e.target.value);
  }

  /* main return function */
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand home" href="#">
          Stud-Shop
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
            <li class="nav-item">
              <input
                type="text"
                placeholder="Enter item"
                className="form-control home searchBar"
                aria-describedby="emailHelp"
                onChange={getQuery}
                style={{ width: "15rem", float: "left" }}
              ></input>
              <Link to={`/search/${query}`}>
                <button className="btn searchBtnHome" to=''>
                <i class="fas fa-search"></i>
                </button>
              </Link>
            </li>
            <li className="nav-item nav-component">
              <div className="component">{MyComponent()}</div>
            </li>

            {signup}

            {extras}
          </ul>
        </div>
      </nav>

      {/* carousel implementation */}
      <div id="c0">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-ride="carousel"
          data-interval="7000"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div class="row">
                <div class="col-md-7 col-lg-7">
                  <img src={logo1} />
                </div>
                <div class="col-md-4 col-lg-4">
                  <h3>The Jugaad of your belongings @SRM done Right.24X7.</h3>
                </div>
              </div>
            </div>
            <div className="carousel-item ">
              <div class="row">
                <div class="col-md-7 col-lg-7">
                  <img src={logo} />
                </div>
                <div class="col-md-4 col-lg-4">
                  <h3>
                    Electronics.Vehicles.Games. Now <strong>#bechde</strong> with Potheri at your
                    fingertips.
                  </h3>
                </div>
              </div>
            </div>
            <div className="carousel-item ">
              <div class="row">
                <div class="col-md-7 col-lg-7">
                  <img src={logo2} />
                </div>
                <div class="col-md-4 col-lg-4">
                  <h3>Making stuff affordable.Don’t believe?? Scroll.</h3>
                </div>
              </div>
            </div>
          </div>
          <a
            className="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
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
      <div className="container-fluid">
        {/*  */}
        <h1 className="recomendation">Recommended</h1>
        <div className=" content">{card}</div>
        <h1 className="recomendation">Categories</h1>
        <div className="carousel-display">
          <div className="carousel-arrange">
            <div className="container">
              <div id="c1">
                <h2>Furniture</h2>
                <div
                  id="carouselExampleControls1"
                  className="carousel slide"
                  data-ride="carousel"
                  data-interval="5000"
                >
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        src="https://i.ytimg.com/vi/2ue-nVWN6kI/maxresdefault.jpg"
                        className="d-block w-100"
                        alt="..."
                      ></img>
                    </div>
                    {furniture}
                  </div>
                </div>
              </div>
              <div id="c2">
                <h2>Automobile</h2>
                <div
                  id="carouselExampleControls1"
                  className="carousel slide"
                  data-ride="carousel"
                  data-interval="5000"
                >
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        src="https://i.ytimg.com/vi/2ue-nVWN6kI/maxresdefault.jpg"
                        className="d-block w-100"
                        alt="..."
                      ></img>
                    </div>
                    {automobile}
                  </div>
                </div>
              </div>
              <div id="c3">
                <h2>Electronic Appliances</h2>
                <div
                  id="carouselExampleControls3"
                  className="carousel slide"
                  data-ride="carousel"
                  data-interval="5000"
                >
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        src="https://i.ytimg.com/vi/2ue-nVWN6kI/maxresdefault.jpg"
                        className="d-block w-100"
                        alt="..."
                      ></img>
                    </div>
                    {electronic_appliance}
                  </div>
                </div>
              </div>
              <div id="c4">
                <h2>Gaming Equipments</h2>
                <div
                  id="carouselExampleControls4"
                  className="carousel slide"
                  data-ride="carousel"
                  data-interval="5000"
                >
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        src="https://i.ytimg.com/vi/2ue-nVWN6kI/maxresdefault.jpg"
                        className="d-block w-100"
                        alt="..."
                      ></img>
                    </div>
                    {gaming}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
          <div className="row">
              <div class="contact col-lg-4">
                <h4>Contact Us</h4>
                <p class="one">Hi, we are always open for cooperation and suggestions,<br /> contact us in one of the ways below</p>
                <div class="text-center">
                  gfg.srmist@gmail.com   
                </div>  
              </div>
              <div class="account col-lg-4"> 
                <h4>GFG</h4>
                <p><a href="#">About us</a></p>
                <p><a href="#">Help</a></p>
              </div>
              <div class="newsletter col-lg-4">  
                <div class="social-btns">
                  <a class="btn insta" href="https://instagram.com/gfg_srmist?igshid=m50lvnk13zob" target="_blank"><i class="fab fa-instagram fa"></i></a>
                  <a class="btn linkedin" href="/https://www.linkedin.com/company/gfg-srm" target="_blank"><i class="fa fa-linkedin"></i></a>
                </div>
            </div>
          </div>
        </footer>
    </div>
  );
};
export default Home;

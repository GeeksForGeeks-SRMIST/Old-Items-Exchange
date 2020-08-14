import React, { useEffect, useState } from "react";
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
      .then((res) => console.log(res.data.items))
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
            <div key={Math.random() * 1000} className="col mb-4">
              <div className="card">
                <img
                  src="https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_1280.jpg"
                  className="card-img-top"
                />
                <h5 className="card-title">{data.item_name}</h5>
                <h3 className="card-title">{data.author}</h3>
                <p className="card-text">{data.price}</p>
                <p>{data.location}</p>
                <p>{data.number}</p>
              </div>
            </div>
          )))
      : (card = product.map((data) => (
          <div key={Math.random() * 1000} className="col mb-4">
            <div className="card">
              <img
                src="https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_1280.jpg"
                className="card-img-top"
              />
              <h5 className="card-title">{data.item_name}</h5>
              <h3 className="card-title">{data.author}</h3>
              <p className="card-text">{data.price}</p>
              <p>{data.location}</p>
              <p>{data.number}</p>
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

  if (!localStorage.getItem("token") || !localStorage.getItem("userId")) {
    signup = (
      <div>
        <Link className="navbar-brand" to="/signup">
          Signup
        </Link>
      </div>
    );
  }
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
        {MyComponent()}
        <h1 className="recomendation">RECOMENDED</h1>
        <div className="row row-cols-1 row-cols-md-3">{card}</div>
      </div>
    </div>
  );
};
export default Home;

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
                  src={data.images[0] || "https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_1280.jpg"}
                  className="card-img-top"
                />  
                <div className="card-body"> 
                <h5 className="card-title" style={{fontWeight:600}}><button className="money"><i className="fas fa-money-bill-wave"></i></button><label className="desc">  &#8377; {data.price}</label></h5>
                  <h5 className="capitalize" style={{fontWeight:600}}><button className="money"><i className="fas fa-luggage-cart"></i></button><label className="desc">{data.item_name}</label></h5>
                  <p style={{textAlign:"center"}}>Owner Details</p>
                  <p className="capitalize"><i class="fas fa-user"></i> : {data.author}</p>
                  <p><i class="fas fa-phone-alt"></i> : {data.number}</p>
                  <p className="location" ><i class="fas fa-map-marked-alt"></i>   {data.location}</p>
                </div>
              </div>
            </div>
          )))
      : (card = product.map((data) => (
          <div key={Math.random() * 1000} className=" cards">
            <div className="card">
                <img
                  src={data.images[0] || "https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_1280.jpg"}
                  className="card-img-top"
                />
                <div className="card-body"> 
                <h5 className="card-title" style={{fontWeight:600}}><button className="money"><i className="fas fa-money-bill-wave"></i></button><label className="desc">  &#8377; {data.price}</label></h5>
                  <h5 className="capitalize" style={{fontWeight:600}}><button className="money"><i className="fas fa-luggage-cart"></i></button><label className="desc">{data.item_name}</label></h5>
                  <p style={{textAlign:"center"}}>Owner Details</p>
                  <p className="capitalize"><i class="fas fa-user"></i> : {data.author}</p>
                  <p><i class="fas fa-phone-alt"></i> : {data.number}</p>
                  <p className="location" ><i class="fas fa-map-marked-alt"></i>   {data.location}</p>
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
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ml-auto">
      
      <li class="nav-item">
        <a href="/search"><i class="fas fa-search"></i></a> 
      </li>
      <li class="nav-item">
        <div className="component">
          {MyComponent()}
        </div>
      </li>
      
      <li class="nav-item">
        {signup}
      </li>
      <li class="nav-item">
          <Link  to="/login">
               Login <i class="fas fa-sign-in-alt"></i>
          </Link>
      </li>
      <li class="nav-item">
        {extras}
      </li>
    </ul>
  </div>
</nav>
      <div className="container-fluid">
        <h1 className="recomendation">Recommended</h1>
        <div className=" content">{card}</div>
      </div>
    </div>
  );
};
export default Home;
              {/* row row-cols-1 row-cols-md-2 row-cols-lg-3 */}

import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./findPage.css";

export const Findpage = () => {
  const [product, updateProduct] = useState([]);
  const [type, updateType] = useState("");
  const userItem = async () => {
    await Axios.get("/api/item/list")
      .then((res) => updateProduct(res.data.items))
      .catch((err) => console.log(err));
  };
  let card;

  const changeType = () => {
    card = product
      .filter((data) => {
        return data.item_name === type || data.location === type;
      })
      .map((data) => (
        <div key={Math.random() * 1000} className="cards">
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
      ));
  };

  const typeChangeHandle = (e) => {
    e.preventDefault();
    updateType(e.target.value);
  };
  useEffect((e) => {
    userItem();
  }, changeType());

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
              <input
                type="text"
                placeholder="Enter item or place"
                className="form-control home searchBar"
                aria-describedby="emailHelp"
                onChange={typeChangeHandle}
                style={{ width: "15rem", float: "left" }}
                value={type}
              ></input>
              <button className="btn btn-outline-light" onClick={changeType}>
              <i class="fas fa-search"></i>
              </button>
            </li>
            <li className="nav-item"> 
              <a href="/"><i className="fas fa-home"></i></a>
            </li>
            <li className="nav-item"> 
              <a href="/profile">Profile</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container-fluid">
        <h4>Search Results</h4>
        <div className=" content" >{card}</div>
      </div>
    </div>
  );
};
export default Findpage;
// row row-cols-1 row-cols-md-2 row-cols-lg-3 col mb-4
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

import "./findPage.css";

export const Findpage = () => {
  const [product, updateProduct] = useState([]);
  const [type, updateType] = useState("");
  const [query,setQuery] = useState("");
  const userItem = async () => {
    if(type!=''){
      await Axios.get(`/api/item/list/${type}`)
      .then((res) => {
        console.log(res.data.items);
        updateProduct(res.data.items);
      })
      .catch((err) => console.log(err));
    }
  };
  let card;
  function cards(product){
    return(
      product.map((data,index) => (
        <div key={Math.random() * 1000} className=" cards ">
              <Link to={`/item/${data._id}`}>
                <div className="card" id={index}>
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
  };

  const getQuery = (e) =>{
    setQuery(e.target.value);
  }
  const typeChangeHandle = () => {
    updateType(query);
    
    setQuery('');
  };
  useEffect((e) => {
    userItem();
  }, [type]);

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
                onChange={getQuery}
                style={{ width: "15rem", float: "left" }}
                value={query}
              ></input>
              <button className="btn btn-outline-light" onClick={typeChangeHandle}>
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
        <div className=" content" >{product == [] || product[0] == undefined ? "Enter The Search Query" : cards(product)}</div>
      </div>
    </div>
  );
};
export default Findpage;
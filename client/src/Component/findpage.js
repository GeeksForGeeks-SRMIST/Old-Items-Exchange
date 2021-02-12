import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

import "./findPage.css";

export const Findpage = (match) => {
  window.onpopstate = e => {
    window.location.reload();
 }
  console.log(match);
  const [product, updateProduct] = useState([]);
  const [type, updateType] = useState("");
  const [query,setQuery] = useState("");
  const userItem = async () => {
    if(match.match.params.id!=''){
      await Axios.get(`/api/item/list/${match.match.params.id}`)
      .then((res) => {
        console.log(res.data.items);
        updateProduct(res.data.items);
      })
      .catch((err) => console.log(err));
    }else{
      updateProduct([]);
    }
  };
  function refreshPage() {
    window.location.reload(false);
  }
  let card;
  function cards(product){
    return(
      product.map((data,index) => (
        <div key={Math.random() * 1000} className=" cards ">
              <Link to={`/item/${data._id}`}>
                <div className="card itemC" id={index}>
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
  var content = "";
  const getQuery = (e) =>{
    setQuery(e.target.value);
  }
  function change(){
    setQuery('');
    updateType(query);
  }
  useEffect((e) => {
    console.log('run');
    userItem();
    console.log(product);
  },[type]);

  return (
    <div className="findPageMainDiv">
      
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="/">Stud-Shop</a>
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
              <Link to={`/search/${query}`}>
                <button className="btn searchBtnHome" onClick={change}>
                <i class="fas fa-search"></i>
                </button>
              </Link>
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
      <div className="container-fluid searchPage">
        <h4>Search Results</h4>
        <div className=" content" >{product == [] || product[0] == undefined ? "No Item Found by that Name" : cards(product)}</div>
      </div>
      <footer className="footer">
          <div className="row">
              <div class="contact col-lg-4">
                <h4>Contact Us</h4>
                <p class="one">Hi, we are always open for cooperation and suggestions,<br /> contact us in one of the ways below</p>
                <div class="details row">
                    <div className="col-sm-6">
                        <p>Phone Number</p>
                        <span>+1 (800)060-07-30</span>
                    </div> 
                    <div className="col-sm-6"> 
                        <p>Email Address</p>
                        <span>us@example.com</span>
                    </div>
                </div>  
              </div>
              <div class="account col-lg-4"> 
                <h4>GFG</h4>
                <p><a href="#">About us</a></p>
                <p><a href="#">Affiliate</a></p>
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
export default Findpage;
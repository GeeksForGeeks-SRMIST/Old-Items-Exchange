import React, { useState, useEffect } from "react";
import Axios from "axios"; 
import { Link } from "react-router-dom";
import Select from "react-select";
import "./itemPage.css";

export const ItemPage = (match)=>{
    const [product, updateProduct] = useState({});
    const [query,setQuery] = useState("");

    const userItem = async () => {
        await Axios.get(`/api/item/${match.match.params.id}`)
        .then((res) => {
            console.log(res.data.item);
            updateProduct(res.data.item); 
          })
        .catch((err) => console.log(err));
    };

    const getQuery = (e) =>{
        setQuery(e.target.value);
    }
    
    console.log(match);
    const data = match.match.params.id;
    useEffect((e) => {
        userItem();
    }, []);

 

    let extras = null;
    let signup = null;

    if (localStorage.getItem("token") || localStorage.getItem("userId")) {
        extras = (
          <li className="nav-item">
            <Link to="/profile">Profile</Link>
          </li>
        );
    }
    
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
    return(
        <div className="itemPage">
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
                            placeholder="Enter item or place"
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
                    <li className="nav-item">
                        <a href="/"><i className="fas fa-home"></i></a>
                    </li>

                        {signup}

                        {extras}
                    </ul>
                    </div>
                </nav>
                <div className="row align-items-center">
                    <div className="col-lg-5">
                        <div class="card" >
                            <img class="card-img-top" src={ product.images == [""] || product.images == "" || product.images == undefined ? "https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_1280.jpg" : product.images[0]  } alt={product.item_name}/>
                            <div class="card-body">
                                <div className="row align-items-center">
                                    <div className="col-lg-6">
                                        <h5 class="card-title" style={{textTransform:"capitalize"}}>{product.item_name}</h5>
                                    </div>
                                    <div className="col-lg-6">
                                        <h5 class="card-title">₹ {product.price}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div class="card ">
                            <div class="card-header  text-center">
                                <h3>Get in touch with the seller</h3>
                            </div>
                            <div className="card-body">
                                <div className="text-center itemPUser"><i class="far fa-user"></i></div>
                                <div className="row align-items-center">
                                    <div className="col-sm-1 ">
                                        <i className="fas fa-signature"></i>
                                    </div>
                                    <div className="col-sm-10">
                                        <h4>{product.author}</h4>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-sm-1 ">
                                        <i className="fas fa-phone-alt"></i>
                                    </div>
                                    <div className="col-sm-10">
                                        <h4>{product.number}</h4>
                                    </div>
                                </div>  
                                <div className="row align-items-center">
                                    <div className="col-sm-1  ">
                                        <i className="fas fa-map-marked"></i>
                                    </div>
                                    <div className="col-sm-10">
                                        <h4>{product.address}, {product.location}</h4>
                                    </div>
                                </div>        
                            </div>
                        </div>
                    </div>
                </div>
                <h1 className="recomendation">Description</h1>
                <div className="description"> 
                    {product.description}
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
}

export default ItemPage;

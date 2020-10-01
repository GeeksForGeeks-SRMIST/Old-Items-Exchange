import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./UserProfile.css";
import Axios from "axios";
export const UserProfile = () => {
  const [product, updateProduct] = useState([]);
  const [name, updateName] = useState("");
  const [address, updateAddress] = useState("");
  const [phone, updatePhone] = useState("");
  const [email, updateEmail] = useState("");
  useEffect(() => {
    requestList();
    requestUserDetails();
  }, [product]);

  /* 
requests userdetail using token auth passed in the header
   */

  const requestUserDetails = async (e) => {
    const head = {
      "x-auth-token": localStorage.getItem("token").toString(),
    };
    await Axios.get("api/auth", {
      headers: head,
    })
      .then((res) => {
        return (
          updateName(res.data.name),
          updatePhone(res.data.phone),
          updateAddress(res.data.address),
          updateEmail(res.data.email)
        );
      })
      .catch((err) => console.log(err));
  };

  /* 
requestList is used to fetch data from the server and display it 
uses token derived from localstorage which is stingified and passed on 
as head
   */

  const requestList = async (e) => {
    const head = {
      "x-auth-token": localStorage.getItem("token").toString(),
    };
    await Axios.get("/api/item/list", {
      headers: head,
    })
      .then((res) => updateProduct(res.data.items))
      .catch((err) => console.log(err));
  };

  const deletehandler = async (key) => {
    const head = {
      "x-auth-token": localStorage.getItem("token").toString(),
    };
    await Axios.delete(`/api/item/${key}`, {
      headers: head,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    console.log(key);
  };

  /* 
this function productlist is used to diplay every element fetch through api
and displaay it specifically to userID using filter and map and displaying it
on to a div component
*/

  const productList = product
    .filter((data) => data.user === localStorage.getItem("userId"))
    .map((data) => (
      <div
        key={data._id}
        className="card bg-white rounded prCard"
      > <img
            src={
              data.images[0] ||
              "https://johnlewis.scene7.com/is/image/JohnLewis/237001430alt5?$rsp-pdp-port-1440$"
            }
            className="product-image card-image-top rounded"
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
          <p className="location">
              <i className="fas fa-map-marked-alt"></i> {data.location}
          </p>
        </div>
          <button
            className="btn btn-danger btn-block btn-lg"
            onClick={() => deletehandler(data._id)}
          >
            Delete
          </button>
      </div>
    ));

  return (
    <div className="userProfile">
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
              <a href="/"><i className="fas fa-home "></i></a>
            </li>
            <li className="nav-item">
              <a href="/">Logout </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="userContent">
        <div className="contain-box bg-white rounded ">
          <image src="" />
          <div className="text-contain-right Details card">
            <div className="card-header">
              <h1>User Profile</h1>
            </div>
            <div className="card-body userDetails row">
              <div className="col-lg-2">
                <i className="far fa-user"></i>
              </div>
              <div className="col-lg-10">
                <div className="row">
                <div className="col-lg-1 col-sm-1"><h4><i className="fas fa-signature"></i></h4></div><div className="col-lg-11 col-sm-11"><h4>{name}</h4></div>
                <div className="col-lg-1 col-sm-1"><h4><i className="fas fa-map-marked"></i></h4></div><div className="col-lg-11 col-sm-11"><h4>{address}</h4></div>
                <div className="col-lg-1 col-sm-1"><h4><i className="fas fa-phone-alt"></i></h4></div><div className="col-lg-11 col-sm-11"><h4>{phone}</h4></div>
                <div className="col-lg-1 col-sm-1"><h4><i className="fas fa-envelope"></i></h4></div><div className="col-lg-11 col-sm-11"><h4>{email}</h4></div>
                </div>
              </div>
            </div>  
            <button className="btn btn-primary btn-lg"><Link to="/form" className="Link">Add More Products</Link></button>
          </div>
        </div>
        <h1>Listed Products:</h1>
        {productList}
      </div>
    </div>
  );
};
export default UserProfile;

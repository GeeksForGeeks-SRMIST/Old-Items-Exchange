import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "./form.css";
import { header } from "express-validator";

let token;

const FormEntry = () => {
  const [product, updateProduct] = useState("");
  const [price, updatePrice] = useState(null);
  const [number, updateNumber] = useState(null);
  const [address, updateAddress] = useState("");
  const [location, updateLocation] = useState("");
  const [valid, updateValid] = useState(false);

  const productName = (e) => {
    e.preventDefault();
    updateProduct(e.target.value);
  };
  const Number = (e) => {
    e.preventDefault();
    updateNumber(e.target.value);
  };
  const Address = (e) => {
    e.preventDefault();
    updateAddress(e.target.value);
  };
  const Location = (e) => {
    e.preventDefault();
    updateLocation(e.target.value);
  };
  const Price = (e) => {
    e.preventDefault();
    updatePrice(e.target.value);
  };
  let tkn = "";
  useEffect(() => {
    token = localStorage.getItem("token");
    tkn = token.toString();
    console.log(tkn);
  });
  const postdetail = async (e) => {
    e.preventDefault();
    const headers = {
      "x-auth-token": tkn,
    };
    await axios
      .post(
        "/api/item",
        {
          item_name: product,
          price,
          number,
          address,
          location,
          images: [],
        },
        {
          headers: headers,
        }
      )
      .then((res) => updateValid(true))
      .catch((err) => {
        console.error(err);
        console.log(err);
      });
  };
  if (valid) return <Redirect to="/"></Redirect>;
  return (
    <div>
      <div>
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <a href="#" className="nav-link active">
              Profile
            </a>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link active">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link active">
              Login
            </Link>
          </li>
        </ul>
      </div>
      <div className="background-form">
        <div className="container-sm">
          <div className="contanier-sm shadow-lg  bg-white rounded">
            <div className="p-3 mb-5">
              <form onSubmit={postdetail}>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  name="name"
                  placeholder="Product Name"
                  onChange={productName}
                />
                <br></br>
                <br></br>
                <input
                  type="number"
                  className="form-control"
                  aria-describedby="emailHelp"
                  name="number"
                  placeholder="Number"
                  onChange={Number}
                />
                <br></br>
                <br></br>
                <input
                  type="number"
                  className="form-control"
                  aria-describedby="emailHelp"
                  name="number"
                  placeholder="Price"
                  onChange={Price}
                />
                <br></br>
                <br></br>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  name="location"
                  placeholder="Location"
                  onChange={Location}
                />
                <br></br>
                <br></br>
                <input
                  name="address"
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="address"
                  onChange={Address}
                />
                <br></br>
                <button
                  className="btn btn-primary"
                  style={{ marginLeft: "178px" }}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEntry;

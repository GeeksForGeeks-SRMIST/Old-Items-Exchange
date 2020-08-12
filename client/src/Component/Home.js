import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  let card;

  card = product.map((data) => (
    <div key={Math.random() * 1000} className="col mb-4">
      <div className="card">
        <img
          src="https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_1280.jpg"
          className="card-img-top"
        />
        <h5 className="card-title">{data.item_name}</h5>
        <p className="card-text">{data.price}</p>
        <p>{data.location}</p>
        <p>{data.number}</p>
      </div>
    </div>
  ));

  //card disply

  /* let card = null;
  card = (
    <div className="row row-cols-1 row-cols-md-3">
      <div className="col mb-4">
        <div className="card">
          <img
            src="https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_1280.jpg"
            className="card-img-top"
          />
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            creative nhi mein jo pehle aya dimaag mein daal dia !
          </p>
        </div>
      </div>
      <div className="col mb-4">
        <div className="card">
          <img
            src="https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_1280.jpg"
            className="card-img-top"
          />
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            creative nhi mein jo pehle aya dimaag mein daal dia !
          </p>
        </div>
      </div>
      <div className="col mb-4">
        <div className="card">
          <img
            src="https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_1280.jpg"
            className="card-img-top"
          />
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            creative nhi mein jo pehle aya dimaag mein daal dia !
          </p>
        </div>
      </div>
      <div className="col mb-4">
        <div className="card">
          <img
            src="https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_1280.jpg"
            className="card-img-top"
          />
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            creative nhi mein jo pehle aya dimaag mein daal dia !
          </p>
        </div>
      </div>
      <div className="col mb-4">
        <div className="card">
          <img
            src="https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_1280.jpg"
            className="card-img-top"
          />
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            creative nhi mein jo pehle aya dimaag mein daal dia !
          </p>
        </div>
      </div>
      <div className="col mb-4">
        <div className="card">
          <img
            src="https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_1280.jpg"
            className="card-img-top"
          />
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            creative nhi mein jo pehle aya dimaag mein daal dia !
          </p>
        </div>
      </div>
    </div>
  ); */
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

  if (!localStorage.getItem("token") || localStorage.getItem("userId")) {
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
        {/*  <input
          type="text"
          placeholder="Enter item or place"
          className="form-control home"
          aria-describedby="emailHelp"
          onChange={typeChangeHandle}
          style={{ width: "15rem", float: "left" }}
          value={type}
        ></input>
        <button className="btn btn-primary" onClick={changeType}>
          Search
        </button> */}

        <h1 className="recomendation">RECOMENDED</h1>
        <div className="row row-cols-1 row-cols-md-3">{card}</div>
      </div>
    </div>
  );
};
export default Home;

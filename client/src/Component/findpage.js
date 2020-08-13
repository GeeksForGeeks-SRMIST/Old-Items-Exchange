import React, { useState, useEffect } from "react";
import Axios from "axios";

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
        return data.item_name == type || data.location == type;
      })
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
      <input
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
      </button>
      <div className="row row-cols-1 row-cols-md-3">{card}</div>
    </div>
  );
};
export default Findpage;

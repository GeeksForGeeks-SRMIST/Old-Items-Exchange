import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import Axios from "axios";
export const UserProfile = () => {
  const [product, updateProduct] = useState([]);

  useEffect(() => {
    request();
  }, []);

  const request = async (e) => {
    const head = {
      "x-auth-token": localStorage.getItem("token").toString(),
    };
    await Axios.get("/api/item/list", {
      headers: head,
    })
      .then((res) => updateProduct(res.data.items))
      .catch((err) => console.log(err));
  };
  console.log(product);

  const productList = product.map((data) => (
    <div
      key={data.item_name}
      className="contain-items shadow-lg p-3 mb-5 bg-white rounded"
    >
      <div className="text-contain-below">
        <img
          src="https://johnlewis.scene7.com/is/image/JohnLewis/237001430alt5?$rsp-pdp-port-1440$"
          className="product-image"
        />
        <h1>{data.item_name}</h1>
        <p>{data.price}</p>
        <p>{data.location}</p>
        <button className="btn btn-danger">Delete</button>
      </div>
    </div>
  ));
  return (
    <div>
      <div className="contain-box shadow-lg p-3 mb-5 bg-white rounded">
        <image src="" />
        <div className="text-contain-right">
          <h4>USER PROFILE</h4>
          <h1>RONALD DUCK</h1>
          <p>address</p>
          <p>Number</p>
          <p>Email</p>
        </div>
      </div>
      {productList}
    </div>
  );
};
export default UserProfile;

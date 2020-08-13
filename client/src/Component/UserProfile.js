import React, { useState, useEffect } from "react";
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
  }, []);

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
    await Axios.delete(`/api/item/list/${key}`, {
      headers: localStorage.getItem("token").toString(),
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
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
          <button
            className="btn btn-danger"
            onClick={() => deletehandler(data._id)}
          >
            Delete
          </button>
        </div>
      </div>
    ));

  return (
    <div>
      <div className="contain-box shadow-lg p-3 mb-5 bg-white rounded">
        <image src="" />
        <div className="text-contain-right">
          <h4>USER PROFILE</h4>
          <h1>{name}</h1>
          <p>{address}</p>
          <p>{phone}</p>
          <p>{email}</p>
        </div>
      </div>
      {productList}
    </div>
  );
};
export default UserProfile;

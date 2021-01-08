import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "./form.css";
import Spinner from "./spinner";
import Axios from "axios";
import Select from "react-select";
import { header } from "express-validator";
import firebase, { storage } from "../config/fire";
import { database } from "firebase";
import img1 from "./WhatsApp_Image_2020-10-02_at_5.42.47_PM-removebg-preview.png";
let token;

const FormEntry = (match) => {
  const data = match.match.params.id;
  const [product, updateProduct] = useState("");
  const [price, updatePrice] = useState(null);
  const [number, updateNumber] = useState(null);
  const [address, updateAddress] = useState("");
  const [description, updateDesc] = useState("");
  const [location, updateLocation] = useState("");
  const [valid, updateValid] = useState(false);
  const [category, updateCategory] = useState("");
  const [image, updateImage] = useState(null);
  const [path, updatePath] = useState("");
  const [loader, updateLoader] = useState(false);
  const [spinner, updateSpinner] = useState(false);
  const requestUserDetails = async (e) => {
    const head = {
      "x-auth-token": localStorage.getItem("token").toString(),
    };
    await Axios.get("api/auth", {
      headers: head,
    })
      .then((res) => {
        return (
          updateNumber(res.data.phone),
          updateAddress(res.data.address),
          updateLocation(res.data.location)
        );
      })
      .catch((err) => console.log(err));
  };
  const productName = (e) => {
    e.preventDefault();
    updateProduct(e.target.value);
  };
  /*  const categoryhandle = (value) => {
    value.preventDefault();
    updateCategory(value);
  }; */
  // const Number = (e) => {
  //   e.preventDefault();
  //   updateNumber(e.target.value);
  // };
  // const Address = (e) => {
  //   e.preventDefault();
  //   updateAddress(e.target.value);
  // };
  // const Location = (e) => {
  //   e.preventDefault();
  //   updateLocation(e.target.value);
  // };
  const Price = (e) => {
    e.preventDefault();
    updatePrice(e.target.value);
  };
  const Desc = (e) => {
    e.preventDefault();
    updateDesc(e.target.value);
  };
  let tkn = "";
  useEffect(() => {
    requestUserDetails();
    token = localStorage.getItem("token");
    tkn = token.toString();
  });
  const imageHandler = (e) => {
    if (e.target.files[0]) {
      updateImage(e.target.files[0]);
    }
  };

  const imageSaveHandler = (e) => {
    e.preventDefault();
    updateSpinner(true);
    const uploadTask = storage.child(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then(
            (downloadURL) => (
              updatePath(downloadURL), updateLoader(true), updateSpinner(false)
            )
          );
      }
    );
  };
  console.log(path);
  const newpath = path.toString();
  console.log(newpath);

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
          images: [newpath],
          category,
          description
        },
        {
          headers: headers,
        }
      )
      .then(() => updateValid(true))
      .catch((err) => {
        console.error(err);
        console.log(err);
      });
  };

  let submit =
    loader === true ? (
      <button
        className="btn btn-primary btn-lg"
        type="submit"
      >
        Submit
      </button>
    ) : null;

  let spinners =
    spinner === true ? (
      <Spinner></Spinner>
    ) : (
      <div className="text-center">
      <button className="btn btn-primary btn-lg" onClick={imageSaveHandler}>
        Upload
      </button>
      {submit}
      </div>
    );

  const options = [
    { value: "Automobile", label: "Automobile" },
    { value: "Furniture", label: "Furniture" },
    { value: "Others", label: "Others" },
    { value: "Electronic Appliances", label: "Electronic Appliances" },
    { value: "Gaming Equipment", label: "Gaming Equipment" },
  ];

  const MyComponent = () => (
    <div className="componentForm">
    <i className="fas fa-filter"></i>
    <Select
      className="selectItems"
      options={options}
      placeholder="Select Product Type"
      onChange={(value) => updateCategory(value.value)}
    />
    </div>
  );

  if (valid) return <Redirect to="/"></Redirect>;
  return (
    <div className="itemDetailsFormFill">
      <nav>
        <ul className="nav bg-dark justify-content-center">
          <li className="nav-item">
            <a href="/" className="nav-link"><i className="fas fa-home"></i></a> 
          </li>
          <li className="nav-item">
            <a href="/profile" className="nav-link active">
              Profile
            </a>
          </li>
        </ul>
      </nav>
      <div className="background-form itemDetailsForm">
        <div className="container-sm">
          <div className=" bg-white rounded">
              <h3>Enter Product Details</h3>
              <form onSubmit={postdetail}>
                <i className="fas fa-signature"></i>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  name="name"
                  placeholder="Enter Product Name"
                  onChange={productName}
                />

                {MyComponent()}

                <i className="fas fa-rupee-sign"></i>
                <input
                  type="number"
                  className="form-control"
                  aria-describedby="emailHelp"
                  name="number"
                  placeholder="Enter Product Price"
                  onChange={Price}
                />
                
                {/* <i className="fas fa-phone-alt"></i>
                <input
                  type="number"
                  className="form-control"
                  aria-describedby="emailHelp"
                  name="number"
                  placeholder="Ph No ( Ex :987654XXXX )"
                  onChange={Number}
                />
                
                
                <i className="fas fa-map-marker-alt"></i>
                <input
                  name="address"
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter your Address"
                  onChange={Address}
                />
                
                <i className="fas fa-map-marked"></i>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  name="location"
                  placeholder="Enter your Location (City)"
                  onChange={Location}
                /> */}
                
                <i className="fas fa-info-circle"></i>
                <textarea name="" id="" rows="6" placeholder="Enter Item Description" onChange={Desc}></textarea>
                <i className="fas fa-images"></i>
                <input
                  placeholder="Select Image"
                  type="file"
                  onChange={imageHandler}
                ></input>
                {spinners}      
              </form>
          </div>
        </div>
      </div>
      <img src={img1} />
    </div>
  );
};

export default FormEntry;

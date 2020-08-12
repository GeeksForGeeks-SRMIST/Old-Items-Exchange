import React, { useState, useEffect } from "react";
import Axios from "axios";

export const HomepageDisplay = () => {
  const [product, updateProduct] = useState([]);

  useEffect(() => {
    userItem();
  }, []);

  const userItem = async () => {
    await Axios.get("/api/item/list")
      .then((res) => updateProduct(res.data.items))
      .catch((err) => console.log(err));
  };
  const card = product.map((data) => (
    <div key={data.number} className="row row-cols-1 row-cols-md-3">
      <div className="col mb-4">
        <div className="card">
          <img
            src="https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_1280.jpg"
            className="card-img-top"
          />
          <h5 className="card-title">{data.item_name}</h5>
          <p className="card-text">{data.price}</p>
          <p className="card-text">{data.location}</p>
          <p className="card-text">{data.number}</p>
        </div>
      </div>
    </div>
  ));
  return <div>{card};</div>;
};
export default HomepageDisplay;

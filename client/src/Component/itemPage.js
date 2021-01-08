import React, { useState, useEffect } from "react";
import Axios from "axios"; 

export const ItemPage = (match)=>{
    const [product, updateProduct] = useState({});
    const userItem = async () => {
        await Axios.get(`/api/item/${match.match.params.id}`)
        .then((res) => {
            console.log(res.data.item);
            updateProduct(res.data.item); 
          })
        .catch((err) => console.log(err));
    };
    console.log(match);
    const data = match.match.params.id;
    useEffect((e) => {
        userItem();
    }, []);
    return(
        <div className="itemPage">
                <div className="row">
                    <div className="col-lg-4">
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
                    <div class="card col-lg-6">
                        <div class="card-header">
                            <h3>Get in touch with the seller</h3>
                        </div>
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-lg-2">
                                    <i className="fas fa-signature"></i>
                                </div>
                                <div className="col-lg-10">
                                    <h4>{product.author}</h4>
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-lg-2">
                                    <i className="fas fa-phone-alt"></i>
                                </div>
                                <div className="col-lg-10">
                                    <h4>{product.number}</h4>
                                </div>
                            </div>  
                            <div className="row align-items-center">
                                <div className="col-lg-2">
                                    <i className="fas fa-map-marked"></i>
                                </div>
                                <div className="col-lg-10">
                                    <h4>{product.address}, {product.location}</h4>
                                </div>
                            </div>        
                        </div>
                    </div>
                </div>
                {product.description}
            </div>
    );
}

export default ItemPage;
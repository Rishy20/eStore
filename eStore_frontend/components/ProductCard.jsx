import React from "react";

import image from 'url:../public/images/iphone.jpg';
import "./ProductCard.css"
import Button from "./Button";

//This component is used to display a single product
function ProductCard(props){
    return(
        <div className="product-card">

            <div className="product-img">
                <img src={`http://localhost:8280/estore/image/${props.img}?service=products`} />
            </div>
            <div className="product-title">{props.name}</div>
            <div className="product-price">Rs.{props.price}</div>
            <Button btnStyle="btn-cart" name="Add to Cart" onclick={props.onClick} />
        </div>
    )
}

export default ProductCard
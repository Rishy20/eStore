import React from "react";
import ProductCard from "./ProductCard";
import "./ProductHolder.css"
import PageTitle from "./PageTitle";
import image from 'url:../public/images/iphone.jpg';
import {useFetch} from "./useFetch";

function ProductHolder({callback,url,title}){

    function addToCart(product){
        callback(product);
    }
    //Get the fetched Products
    const  {loading,products} = useFetch(url);

    return(
        <div className="product-holder-div">
            <PageTitle title={title}/>
            <div className="product-holder">
                {
                    products.map(product => {
                        return <ProductCard img={product.img} name={product.name} price={product.price} onClick={()=>addToCart(product)} key={product._id.toString()} id={product._id}/>
                    })
                }
                {products.length ===0 && <h3>Product not found</h3> }

            </div>
        </div>
    )

}

export default ProductHolder
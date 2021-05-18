import React, {useState} from 'react';
import ProductHolder from "../ProductHolder";
import "./Home.css"
const url = "http://localhost:8280/estore?service=products"
//Home Component
function Home({addToCart}){

    return(
        <div className='Home'>
            {/*<div className="hero-img"></div>*/}
                <ProductHolder callback={addToCart} url={url} title={"All Products"}/>
        </div>
    )
}
export default Home;
import React, {useState} from 'react';
import ProductHolder from "../ProductHolder";
import {useParams} from "react-router-dom"

//Component to display Search Results
function SearchResult({addToCart}){
    let {query} = useParams();
    const url = "http://localhost:8280/product/search/"+query;
    return(
        <div className='Home'>
            <ProductHolder callback={addToCart} title={"Search Results"} url={url}/>
        </div>
    )
}
export default SearchResult;
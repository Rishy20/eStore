import {useState,useEffect} from "react";

//This custom hook handles fetches
export const useFetch = (url) =>{

    const [loading,setLoading] = useState(true);
    const [products,setProducts] = useState([]);

    const getProducts = async () =>{
        //Fetches the products from the db
        const response = await fetch(url).catch(err=>console.log(err));
        const prod = await response.json();
        //Set the products state
        setProducts(prod)
        setLoading(false);
    };
    useEffect(()=>{
        getProducts();
    },[url]);

    return {loading,products};
}
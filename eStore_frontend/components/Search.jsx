import React, {useState} from "react";

import Button from "./Button";
import "./Search.css"
import {Link} from "react-router-dom";
//This component contains the search form and search box
function Search(){

    const [query,setQuery] = useState("");
    const handleChange = e=>{
        setQuery(e.target.value);
    };
    return(
        <div className="search">
                <input className="input-box" name="search" value={query} onChange={handleChange} placeholder="Enter the name of the Product to Search"/>
            <Link to={`/search/${query}`}> <Button btnStyle="btn-search" name="Search"/> </Link>
        </div>
    )
}
export default Search;
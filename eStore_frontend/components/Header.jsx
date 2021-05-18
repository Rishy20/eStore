import React, {useState} from "react";

import "./Header.css"
import Search from "./Search";
import Cart from "./Cart";
import {Link} from "react-router-dom";
const WEBSITE = "eStore";
function Header({toggleCart,userType,logout}){


    return(

        <div className="header">
            <Link to="/"><span className="header-title">{WEBSITE}</span></Link>
            <div className="search-bar">
                <Search/>
            </div>
            <span className="login-links">
                {
                    //Check usertype and display Sell only if the user is a seller
                    userType?(
                        <>
                            {
                        userType==="Seller"?(
                            <Link to="/products"><a className="header-link" href="#">Sell</a></Link>
                        ):null
                            }
                            <a className="header-link" href="#" onClick={logout}>Logout</a>
                        </>
                    ):(
                        <>
                        <Link to="/login"><a className="header-link" href="#">Login</a></Link>
                        <Link to="/register"><a className="header-link" href="#">Register</a></Link>
                        </>
                    )
                }

                <span className="header-link" href="#" onClick={toggleCart}><i className="fas fa-shopping-cart cart-icon"/></span>
            </span>


        </div>

    )
}
export default Header;
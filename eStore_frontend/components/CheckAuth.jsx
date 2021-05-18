import React from "react";
import {Redirect} from "react-router-dom";
import checkLogin from "./CheckLogin";

//Component to validate if the Logged in user is a seller
const checkAuth = (Component) => {
    const AuthRoute = () => {
        const isAuth = checkLogin();

        if (isAuth() === "Seller") {
            return <Component />;
        } else {
            return <Redirect to="/" />;
        }
    };
    return AuthRoute;
};

export default checkAuth;
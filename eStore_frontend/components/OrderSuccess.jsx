import React from "react"
import Button from "./Button";
import {Link} from "react-router-dom";

const styleDiv = {
    padding:50,
    marginTop:50
}
const h2Style={
    marginBottom:30
}
export default function OrderSuccess(props){
    return(
        <div style={styleDiv}>
            <h2 >Thank you for the Order! Your Order #{props.orderId} has been placed Successfully</h2>
            <h3 style={h2Style}>You're products will be delivered within another 4-5 days.</h3>
            <Link to={"/"}> <Button btnStyle="btn-save" name="Continue Shopping"/></Link>
        </div>
    )
}
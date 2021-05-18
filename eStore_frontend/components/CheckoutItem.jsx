import React from "react";
import image from 'url:../public/images/iphone.jpg';
export default function CheckoutItem(props){

    return(
        <tr className="checkout-item">
            <td className="checkout-item-img"><img src={"http://localhost:3000/"+props.img} /></td>
            <td className="checkout-item-name">{props.name}</td>
            <td className="checkout-item-qty">{props.qty}</td>
            <td className="checkout-item-price">Rs.{props.price.toFixed(2)}</td>
        </tr>
    )
}
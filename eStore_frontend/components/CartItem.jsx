import React from "react";


function CartItem(props){
    return (
        <div className="cart-item">
            <div className="cart-item-img">
                <img src={`http://localhost:8280/estore/image/${props.img}?service=products`} />
            </div>
            <div className="cart-item-detail">
                <span className="cart-item-close" onClick={props.remove}><i className="fas fa-times"></i></span>
                <div className="cart-item-pname">
                    {props.pname}
                </div>
                <span className="cart-item-qty">
                    <input type="number" value={props.qty} onChange={props.updateQty} name={props.id} />
                </span>
                <span className="cart-item-price">
                   <span className="cart-item-price-times">x</span> <span className="cart-item-price-value">Rs.{props.price}</span>
                </span>
            </div>
        </div>
    )
}
export default CartItem;
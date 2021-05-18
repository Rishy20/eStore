import React from "react";
import PageTitle from "./PageTitle";
import "./Checkout.css"
import CheckoutItem from "./CheckoutItem";
import Button from "./Button"
import {Link} from "react-router-dom";

//Component to displayCheckout
function Checkout({cart,total,callback}){

    const products = {cart}
    return(
        <div className="checkout">
            <PageTitle title="checkout"/>
            <div className="checkout-body">
                {/*Check if there are products in the cart*/}
                {products.cart.length === 0 ? <p className="no-items">No items in cart. Please add products to the cart to checkout</p> : null}

                {products.cart.length !== 0 ?
                    <>
                <table className="checkout-products">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        products.cart.map(product => {
                            return <CheckoutItem name={product.name} img={product.img} price={product.price} qty={product.qty} key={product.id}/>
                        })
                    }
                    </tbody>
                </table>
                <div className="total-div">
                    <span className="total-div-text">Total </span>
                    <span className="total-div-amount">Rs.{total().toFixed(2)}</span>
                </div>
                <div className="checkout-btn-div">
                    <Button name="Checkout" btnStyle="btn-next" onclick={callback}/>
                    <Link to="/"><Button name="Cancel" btnStyle="btn-cancel"/></Link>
                </div>
                    </>:null}
            </div>
        </div>
    )
}
export default Checkout;


import React,{useState} from "react";
import BillingInfo from "../BillingInfo";
import "./Billing.css"
import PaymentInfo from "../PaymentInfo";
import Progress from "../Progress";
import Checkout from "../Checkout";
import OrderSuccess from "../OrderSuccess";

export default function Billing({cart,total,clearCart}){
    //State to maintain Submission state
    const[isSubmitted,setIsSubmitted] = useState(false);
    //State to maintain Confirmation State
    const[isConfirmed, setIsConfirmed] = useState(false);
    //State to Check whether shipping details are entered
    const[isShippingEntered, setIsShippingEntered] = useState(false);

    const [isPaymentMade, setIsPaymentMade] = useState(false);
    //State to store errors
    const [error,setError] = useState(false);
    //State to store values
    const[values,setValues] = useState({products:cart});
    //State to store order Id
    const [orderId,setOrderId] = useState(0);
    //Method to set payment details to sate
    function setPayment(payment){
        setValues({...values,...payment});
        setIsPaymentMade(true);
        values.products.forEach(p=>{delete p.description; delete p.category; delete p.brand; delete p.sku; delete p.img;})
        submitForm(payment);
    }
    //Method to handle form submission
    function submitForm(payment){
        //Creating an object with data to submit
        const obj = {
            "delivery":{
                "fname":values.fname,
                "lname":values.lname,
                "contact":values.contact,
                "address1":values.address1,
                "address2":values.address2,
                "city":values.city,
                "state":values.state,
                "zipcode":values.zipcode,
                "country":values.country,
                "deliverytype":payment.deliverytype,
                "email":values.email,
            },
            "payment":{
                "paymenttype":payment.paymenttype,
                "total":values.total
            },
            "products":values.products
        }
        //Setting card details to the object
        if(payment.paymenttype === "Card"){
            obj.payment.chname=payment.chname;
            obj.payment.cvc=payment.cvc;
            obj.payment.cnum=payment.cnum;
            obj.payment.expiry=payment.expiry;
        }else{
            //Setting mobile payment details
            obj.payment.mobile=payment.mobile;
            obj.payment.pincode=payment.pincode;
            obj.payment.mobilesp=payment.mobilesp;
        }
        //Sends a POST request to the backend with the Order details
        fetch("http://localhost:8280/estore?service=checkout",{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method:"POST",
            body: JSON.stringify(obj)
        }).then(res => res.json())
            .then(data=>{
                if(data.status==="Success"){
                    setOrderId(data.OrderId);
                    setIsSubmitted(true);
                    clearCart();
                }else{
                    setError(data.message);
                }
            })
            .catch(err=>console.log(err));
    }

    function shippingEntered(val){
        setIsShippingEntered(true);
        setValues({...values,...val});
    }

    function setTotal(total){
        setValues({...values,["total"]:parseInt(total)});
    }
    function backToCheckout(){
        setIsConfirmed(false);
    }
    function backToShipping(){
        setIsShippingEntered(false);
    }
    return(
        <div className="billing-container">
            {
                (()=>{
                    if(!isConfirmed){
                        return <>
                            <Progress labels={["Checkout","Shipping", "Payment"]} selected={1} />
                            <Checkout cart={cart} total={total} callback={()=>{setIsConfirmed(true)}}/>
                        </>
                    }
                   else if(!isShippingEntered && isConfirmed){
                       return <>
                           <Progress labels={["Checkout","Shipping", "Payment"]} selected={2} />
                           <BillingInfo callback={shippingEntered} backBtn={backToCheckout}/>
                       </>
                   } else if(isShippingEntered && !isSubmitted) {

                        return <>
                            <Progress labels={["Checkout", "Shipping", "Payment"]} selected={3}/>

                            <PaymentInfo callback={setPayment} total={total} setTotal={setTotal}
                                         backBtn={backToShipping}/>
                            {error?<div className="payment-error">{error}</div>:null}
                        </>
                    }else if(isSubmitted){
                       return <OrderSuccess orderId={orderId}/>
                    }
                    })()
            }
        </div>
    )
}
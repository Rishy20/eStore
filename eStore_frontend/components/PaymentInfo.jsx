import React, {useState} from "react";
import PageTitle from "./PageTitle";
import Form from "./Form";
import PaymentCard from "./PaymentCard";
import PaymentMobile from "./PaymentMobile";




export default function PaymentInfo({callback,total,setTotal,backBtn}){

    const[paymentType,setPaymentType] = useState("Card");
    const[deliveryType,setDeliveryType] = useState();
    const [tot,setTot] = useState(total().toFixed(2));

    function selectPayment(e){
        setPaymentType(e.target.value);
    }
    function selectDelivery(e){
        let dtype = e.target.value;
        setDeliveryType(dtype);
        let totAmount = total();
        //Add 500 to total if home delivery is selected
        dtype==="Home Delivery"?totAmount=(total()+500).toFixed(2):totAmount=total().toFixed(2);
        setTot(totAmount);
        setTotal(totAmount);
    }
    return(
        <div className="payment-body">
            <div className="payment-title">
                <PageTitle title="Payment Details"/>
            </div>
            <div className="payment-total">
                <span className="payment-total-text">Total</span>
                <span className="payment-total-amount">Rs.{tot}</span>
            </div>
            {
                //Display Payment based on Payment type
                paymentType==="Card"?
                    <PaymentCard callback={callback} selectPayment={selectPayment} selectDelivery={selectDelivery} deliveryType={deliveryType} backBtn={backBtn}/>:
                    <PaymentMobile callback={callback} selectPayment={selectPayment} selectDelivery={selectDelivery} deliveryType={deliveryType} backBtn={backBtn}/>
            }

        </div>

    )

}
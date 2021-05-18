import React, {useState} from "react";
import Form from "./Form";

//Component to display Card Payment details
export default function PaymentCard({callback,selectPayment,selectDelivery,deliveryType,backBtn}){

    //Input box names used in the form so that they can be sent to useForm hook to maintain the state
    const namesCard={
        deliverytype:deliveryType,
        paymenttype:"Card",
        chname:'',
        cnum:'',
        cvc:'',
        expiry:''
    }
    const inputCard=[
        {
            label: "Delivery Type",
            type:"radio-full",
            name:"deliverytype",
            values:["Home Delivery","Store Pickup"],
            onSelect: selectDelivery
        },
        {
            label: "Payment Type",
            type:"radio-full",
            name:"paymenttype",
            values:["Card","Mobile"],
            onSelect:selectPayment
        },

        {
            label:"Card holder's name",
            type:"text",
            name:"chname"
        },
        {
            label:"Card Number",
            type:"text",
            name:"cnum",
            maxLength:19
        },
        {
            label:"Expiry Date",
            type:"text",
            name:"expiry",
            placeholder:"mm/yy"
        },
        {
            label:"CVC",
            type:"text",
            name:"cvc",
            maxLength: 3
        }

    ]
    //Buttons to be displayed in the form
    const buttons = [
        {
            name:"Confirm Payment",
            style:"btn-next",
            type:"Submit"
        },
        {
            name:"Back",
            style:"btn-cancel",
            onclick:backBtn
        },
    ]

    return(
                    <Form inputs={inputCard} names={namesCard} callback={callback} btns={buttons} />

    )

}
import React, {useState} from "react";
import PageTitle from "./PageTitle";
import Form from "./Form";
//Input box names used in the form so that they can be sent to useForm hook to maintain the state



export default function PaymentMobile({callback,selectPayment,selectDelivery,deliveryType,backBtn}){
    const namesMobile={
        deliverytype:deliveryType,
        paymenttype:"Mobile",
        mobile:"",
        pincode:"",
        mobilesp:""
    }

    const inputMobile=[
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
            label: "Mobile Service Provider",
            type:"radio-full",
            name:"mobilesp",
            values:["Dialog","Mobitel","Airtel","Etisalat","Hutch"],
            onSelect: ()=>{}

        },
        {
            label:"Mobile Number",
            type:"text",
            name:"mobile",
            placeholder:"Enter your mobile no."
        },
        {
            label:"Pincode",
            type:"text",
            name:"pincode",
            placeholder:"Enter your 4 digit pin code"
        },


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
                    <Form inputs={inputMobile} names={namesMobile} callback={callback} btns={buttons} />

    )

}
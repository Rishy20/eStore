import React from "react";
import Form from "./Form";

const names={
    accType:'Seller Account',
    fname:'',
    lname:'',
    email:'',
    password:'',
    contact:'',
    address:'',
    businessName:'',
    city:'',
    state:'',
    country:'',
    zipcode:''
}
//Form Submit Url
const url = "http://localhost:8280/estore?service=register";


//Buttons to be displayed in the form
const buttons = [
    {
        name:"Register",
        style:"btn-save",
        type:"Submit"
    },
    {
        name:"Cancel",
        style:"btn-cancel",
    },
]
export default function SellerAccountRegister(props){

    const inputs=[
        {
            type:"radio-full",
            name:"accType",
            values:["Personal Account","Seller Account"],
            onSelect:props.onSelect
        },
        {
            label:"First Name",
            type:"text",
            name:"fname"
        },
        {
            label:"Last Name",
            type:"text",
            name:"lname"
        },
        {
            label:"Email",
            type:"email",
            name:"email"
        },
        {
            label:"Business Name",
            type:"text",
            name:"businessName"
        },
        {
            label:"Password",
            type:"password",
            name:"password",
        },
        {
            label:"Confirm Password",
            type:"password",
            name:"confirmPassword",
        },
        {
            label:"Contact",
            type:"tel",
            name:"contact"
        },
        {
            label:"Address",
            type:"text",
            name:"address"
        },
        {
            label:"City",
            type:"text",
            name:"city"
        },
        {
            label:"State",
            type:"text",
            name:"state"
        },
        {
            label:"Zip Code",
            type:"text",
            name:"zipcode"
        },
        {
            label:"Country",
            type:"select",
            name:"country",
            values:["Sri Lanka"]
        },
    ]

    return(
        <Form inputs={inputs} names={names} callback={props.callback} btns={buttons} url={url}/>
    )
}
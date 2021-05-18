import React from "react";
import Form from "./Form";

//Input box names used in the form so that they can be sent to useForm hook to maintain the state
const names={
    accType:'Personal Account',
    fname:'',
    lname:'',
    email:'',
    password:'',
    contact:'',
    address1:'',
    address2:'',
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
export default function PersonalAccountRegister(props){

    //Inputs stored as an array so they can be mapped to Input component
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
            label:"Contact",
            type:"tel",
            name:"contact"
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
            label:"Address 1",
            type:"text",
            name:"address1"
        },
        {
            label:"Address 2",
            type:"text",
            name:"address2"
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
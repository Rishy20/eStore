import React from "react";
import PageTitle from "./PageTitle";
import Form from "./Form";
//Input box names used in the form so that they can be sent to useForm hook to maintain the state
const names={
    fname:'',
    lname:'',
    email:'',
    contact:'',
    address1:'',
    address2:'',
    city:'',
    state:'',
    country:'',
    zipcode:''
}
//Input boxes
const inputs=[
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

export default function BillingInfo({callback,backBtn}){

//Buttons to be displayed in the form
    const buttons = [
        {
            name:"Next",
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
        <div>
            <div className="billing-title">
                <PageTitle title="Billing Details"/>
            </div>
            <Form inputs={inputs} names={names} callback={callback} btns={buttons} />
        </div>

    )

}
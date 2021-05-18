//Import the methods
const save = require('../dal/mobilepayment.dao');
const uuid = require('uuid');
const  date = require('date-and-time');

//Map the save() method
const createPayment = async ({mobilesp,mobile,pincode,total}) => {


    //Check if pincode is a number
    if(!parseInt(pincode)){
        return {status:"Fail",message:"Pincode should contain only digits"};
    }
    //Check if pincode is 4 digit
    if(pincode.length!==4){
        return {status:"Fail",message:"Pincode is invalid"};
    }
    //check if amount is valid
    if(total<=0){
        return {status:"Fail",message:"Total is invalid"};
    }
    //Check if mobile number is valid

    if(! /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(mobile)){
        return {status:"Fail",message:"Mobile number is invalid"};
    }

    const now = new Date();

    //Create a Payment object
    const payment = {
        id:uuid.v4(),
        mobilesp,
        mobile,
        pincode,
        total,
        date:date.format(now, 'DD/MM/YYYY HH:mm:ss')

    }
    //Call the Save method and pass the Payment object
    let response = await save(payment);
     //Check if the data is saved successfully in the db
    if(response===1)
        return {status:"Success",paymentId:payment.id};
    else
        return {status:"Fail",message:"Error in Mobile Payment Gateway, please try again later"};
}

//Export the methods to be used in routes
module.exports = {
    createPayment
}

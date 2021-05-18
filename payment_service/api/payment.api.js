//Import the methods
const save = require('../dal/payment.dao');
const uuid = require('uuid');
const cardValidator = require("card-validator");
const  date = require('date-and-time');

//Map the save() method
const createPayment = async ({chname,cnum,cvc,expiry,total}) => {

    //Check if cvc is a number
    if(!parseInt(cvc)){
        return {status:"Fail",message:"Cvc should contain only digits"};
    }
    //Check if cvc contains 3 digits
    if(cvc.length!==3){
        return {status:"Fail",message:"Cvc number is invalid"};
    }
    //check if amount is valid
    if(total<=0){
        return {status:"Fail",message:"Amount is invalid"};
    }
    //Check if card number is valid
    let validate = cardValidator.number(parseInt(cnum));
    if(!validate.isPotentiallyValid){
        return {status:"Fail",message:"Card number is invalid"};
    }

    const now = new Date();

    //Create a Payment object
    const payment = {
        id:uuid.v4(),
        chname,
        cnum,
        cvc,
        expiry,
        type:validate.card.niceType,
        total,
        date:date.format(now, 'DD/MM/YYYY HH:mm:ss') //Get the current date and time
    }
    //Call the Save method and pass the Payment object
    let response = await save(payment);

    //Check if payment is successful
    if(response===1)
        return {status:"Success",paymentId:payment.id};
    else
        return {status:"Fail",message:"Error in Payment Gateway, please try again later"};
}

//Export the methods to be used in routes
module.exports = createPayment;


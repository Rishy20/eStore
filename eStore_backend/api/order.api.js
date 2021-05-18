//Import the methods
const {getAll, getById, removeById, save, update, getLastId} = require('../dal/order.dao');
//Import uuid to generate an unique id
const uuid = require('uuid');
//Import date-time module
const  date = require('date-and-time');
//Import nodemailer to handle mails
const nodemailer = require('nodemailer');

const sid = process.env.TWILLIOSID;
const token = process.env.TWILLIOAUTHTOKEN;
//Create a connection to twilio to send sms
const client = require('twilio')(sid, token);

//Method used to create an order
const createOrder = async ({paymentId,customer,products,deliveryId,total}) => {

    //Validate details
    if(!paymentId){
        return {status:"Fail",msg:"Order Failed, Payment Id not found, Please try again"};
    }
    if(!customer){
        return {status:"Fail",msg:"Order Failed, Customer details are not found, Please try again"};
    }
    if(!products){
        return {status:"Fail",msg:"Order Failed, Product details are not found, Please try again"};
    }
    if(!deliveryId){
        return {status:"Fail",msg:"Order Failed, Delivery Id not found, Please try again"};
    }
    if(!total){
        return {status:"Fail",msg:"Order Failed, Order Total not found, Please try again"};
    }

    //Get the order id of the last saved order
    const id = (await getLastId())[0].id;
    //Create an order object
    const order={
        paymentId,
        deliveryId,
        customer,
        products,
        total
    }
    //Check if this is the first order or else add 1 to the order id
    id!=="undefined"?order.id=id+1:order.id=1000;
    //Call the Save method and pass the Order object and check if save is successful
    if(await save(order) === 1){
        //Call sendEmail method to send an email
        sendEmail(order.customer.email,order.id);
        //Call sendSMS method to send a sms
        //The number is converted to international format
        sendSMS("+94"+order.customer.contact.substr(1),order.id);
        //Return the order Id
        return {status:"Success",OrderId:order.id};
    } else{
        return {status:"Fail",msg:"Order Failed, Please try again"};
    }

}
//This method handles sending emails
const sendEmail = (email,orderId)=>{

    //Authenticate the email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'estorelk7@gmail.com',
            pass: 'Estore1234'
        }
    });

    //Message
    const mailOptions = {
        from: 'eStore',
        to: email,
        subject: 'Order Confirmation',
        text: `Thank you for your Order. Your order #${orderId} has been placed successfully. You will receive your order within another 4-5 days.`
    };
    //Send Email
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        }
    });
}
//Method to handle SMS
const sendSMS = (number,orderId)=>{
    //Send SMS
    client.messages
        .create({
            body: `Thank you for your purchase at eStore. Your order #${orderId} has been placed successfully. Your order will be delivered within another 4-5 days`,
            from: +19519728192,
            to: number
        })
        .catch(err => console.log(err));
}

//Map the getAll() method
const getOrders = async ()=>{
    return await getAll();

}
//Map the getById() method
const getOrder = async id =>{
    return await getById(id);
}
//Map the removeById() method
const deleteOrder = async id =>{
    return await removeById(id);
}

//Export the methods to be used in routes
module.exports = {
    createOrder,
    getOrders,
    getOrder,
    deleteOrder
}

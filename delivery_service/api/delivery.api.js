//Import the methods
const save = require('../dal/delivery.dao');
const uuid = require('uuid');
const  date = require('date-and-time');

//Map the save() method
const createDelivery = async ({delivery}) => {

    //Check if these property exists
    const {fname,lname,address1,address2,city,state,zipcode,country,deliverytype,contact,email} =delivery;
    //Validate the details
    if(!fname.trim() || !lname.trim() || !address1.trim() || !city.trim() || !state.trim() || !zipcode.trim() || !country.trim() || !deliverytype.trim() || !contact.trim() || !email.trim()){
        return {status:"Fail",message:"Invalid Details"}
    }

    const now = new Date();

    //Create a Customer object
    const customer = {
        id:uuid.v4(), // Generate an id
        deliverytype,
        fname,
        lname,
        address1,
        address2,
        city,
        state,
        zipcode,
        country,
        contact,
        email,
        date:date.format(now, 'DD/MM/YYYY HH:mm:ss')//Get the current date
    }
    //Call the Save method and pass the Customer object
    let response = await save(customer);

    //Check if the data is saved successfully in the database
    if(response===1)
        return {status:"Success","deliveryId":customer.id};
    else
        return {status:"Fail",message:"Delivery Failed, Please Try again later"};
}

//Export the methods to be used in routes
module.exports = createDelivery


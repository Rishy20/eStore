//Import the methods
const {getAll, getById, removeById, save, update} = require('../dal/buyer.dao');
const {saveUser,updateUser} = require('../dal/login.dao');
//Require bcrypt
const bcrypt = require('bcrypt');
//Map the save() method
const createBuyer = async ({fname,lname,email,password,contact,address1,address2,city,state,zipcode,country}) => {

    //Encrypt the password
    password = await bcrypt.hash(password,5);
    //Create a buyer object
    const buyer = {
        fname,
        lname,
        contact,
        address1,
        address2,
        city,
        state,
        zipcode,
        country
    }
    //Call the Save method and pass the buyer object
    let buyerId = await save(buyer);
    //Check if the buyer is saved successfully in the db
    if(!buyerId){
        return {status:"Fail",msg:"Failed to save Buyer in the database"}
    }

    //Create a user object to save them in the Login collection
    const user = {
        _id:buyerId,
        email,
        password,
        usertype:"Buyer"
    }
    let id = await saveUser(user);
    if(id === 1){
        return {status:"Success"}
    }else{
        return {status:"Fail",msg:"Failed to create Login in the database"}
    }

}
//Map the getAll() method
const getBuyers = async ()=>{
    return await getAll();
}
//Map the getById() method
const getBuyer = async id =>{
    return await getById(id);
}
//Map the removeById() method
const deleteBuyer = async id =>{
    return await removeById(id);
}
//Map the update method
const updateBuyer = async (id,{fname,lname,email,password,contact,address1,address2,city,state,zipcode,country})=>{

    //Create a buyer object
    const buyer = {
        fname,
        lname,
        email,
        password,
        contact,
        address1,
        address2,
        city,
        state,
        zipcode,
        country
    }
    //Create an user object
    const user = {
        email,
        password,
        usertype:"Buyer"
    }
    //Update the buyer in the db
    let result = await update(id,buyer);
    //Check if the update is successful
    if(result === 1){
        //Update the login credentials
        result = await updateUser(id,user);
        //Check if update is successful
        if(result === 1){
            return {status:"Success",msg:"User updated Successfully"}
        }
    }
    return {status:"Fail",msg:"User update Failed"}
}
//Export the methods to be used in routes
module.exports = {
    createBuyer,
    getBuyers,
    getBuyer,
    deleteBuyer,
    updateBuyer
}

//Import the methods
const {getAll, getById, removeById, save, update} = require('../dal/seller.dao');
//Require bcrypt
const bcrypt = require('bcrypt');
const {saveUser,updateUser} = require("../dal/login.dao");
//Map the save() method
const createSeller = async ({fname,lname,email,password,businessName,contact,address,city,state,zipcode,country}) => {

    //Encrypt the password
    password = await bcrypt.hash(password,5);
    //Create a Seller object
    const seller = {
        fname,
        lname,
        businessName,
        contact,
        address,
        city,
        state,
        zipcode,
        country
    }

    //Call the Save method and pass the seller object
    let sellerId = await save(seller);
    //Check if the buyer is saved successfully in the db
    if(!sellerId){
        return {status:"Fail",msg:"Failed to save Seller in the database"}
    }

    //Create a user object to save them in the Login collection
    const user = {
        _id:sellerId,
        email,
        password,
        usertype:"Seller"
    }
    let id = await saveUser(user);
    if(id === 1){
        return {status:"Success"}
    }else{
        return {status:"Fail",msg:"Failed to create Login in the database"}
    }



}
//Map the getAll() method
const getSellers = async ()=>{
    return await getAll();
}
//Map the getById() method
const getSeller = async id =>{
    return await getById(id);
}
//Map the removeById() method
const deleteSeller = async id =>{
    return await removeById(id);
}
//Map the update method
const updateSeller = async (id,{fname,lname,email,password,businessName,contact,address,city,state,zipcode,country})=>{

    //Create a Seller object
    const seller = {
        fname,
        lname,
        email,
        password,
        businessName,
        contact,
        address,
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
    //Update the seller in the db
    let result = await update(id,seller);
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
    createSeller,
    getSellers,
    getSeller,
    deleteSeller,
    updateSeller
}

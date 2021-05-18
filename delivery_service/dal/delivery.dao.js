//Database Name
const DBNAME = process.env.DB_NAME;
//Collection Name
const COLLECTION = 'Delivery';
//Import the getClient method
const getClient = require("./connection");
//Import ObjectId
const {ObjectId} = require('mongodb');

let delivery;

//Establish the connection
getClient().then(data=>{
    delivery = data.db(DBNAME).collection(COLLECTION);
}).catch(err=>{
    console.error(err);
});

//Save method
const save = async (customer) => {
    //Insert data to db
    const result = await delivery.insertOne(customer);
    return result.insertedCount;
}


//Export the methods
module.exports = save;

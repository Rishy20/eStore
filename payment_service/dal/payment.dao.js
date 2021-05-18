//Database Name
const DBNAME = process.env.DB_NAME;
//Collection Name
const COLLECTION = 'Payment';
//Import the getClient method
const getClient = require("./connection");
//Import ObjectId
const {ObjectId} = require('mongodb');

let payments;

//Establish the connection
getClient().then(data=>{
    payments = data.db(DBNAME).collection(COLLECTION);
}).catch(err=>{
    console.error(err);
});

//Save method
const save = async (payment) => {
    //Insert to the db
    const result = await payments.insertOne(payment);
    return result.insertedCount;
}

//Export the methods
module.exports = save;

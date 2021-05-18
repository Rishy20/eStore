//Database Name
const DBNAME = process.env.DB_NAME;
//Collection Name
const COLLECTION = 'Orders';
//Import the getClient method
const getClient = require("./connection");
//Import ObjectId
const {ObjectId} = require('mongodb');

let orders;

//Establish the connection
getClient().then(data=>{
    orders = data.db(DBNAME).collection(COLLECTION);
}).catch(err=>{
    console.error(err);
});

//Save method
const save = async (order) => {
    const result = await orders.insertOne(order);
    return result.insertedCount;
}
//GetAll method
const getAll = async () =>{
    const cursor = await orders.find();
    return cursor.toArray();
}
//GetById method
const getById = async (id) =>{
    return await orders.findOne({id:id});
}
//Delete method
const removeById = async id =>{
    const result = await orders.deleteOne({id:id});
    return result.deletedCount;
}
//Get the lastly stored order
const getLastId = async ()=>{
   const result = await orders.find().sort({_id : -1}).limit(1);
   //Return the last saved order
    return result.toArray()
}

//Export the methods
module.exports = {
    getAll,
    getById,
    removeById,
    save,
    getLastId

};
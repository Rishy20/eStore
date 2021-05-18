//Database Name
const DBNAME = process.env.DB_NAME;
//Collection Name
const COLLECTION = 'Buyers';
//Import the getClient method
const getClient = require("./connection");
//Import ObjectId
const {ObjectId} = require('mongodb');

let buyers;

//Establish the connection
getClient().then(data=>{
    buyers = data.db(DBNAME).collection(COLLECTION);
}).catch(err=>{
    console.error(err);
});

//Save method
const save = async (buyer) => {
    const result = await buyers.insertOne(buyer);
    return result.insertedId;
}
//GetAll method
const getAll = async () =>{
    const cursor = await buyers.find();
    return cursor.toArray();
}
//GetById method
const getById = async (id) =>{
    return await buyers.findOne({_id:ObjectId(id)});
}
//Delete method
const removeById = async id =>{
    const result = await buyers.deleteOne({_id:ObjectId(id)});
    return result.deletedCount;
}
//Update method
const update = async (id, buyer) =>{

    const result = await buyers.replaceOne({_id:ObjectId(id)}, buyer);
    return result.modifiedCount;
}
//Export the methods
module.exports = {
    getAll,
    getById,
    removeById,
    save,
    update
};
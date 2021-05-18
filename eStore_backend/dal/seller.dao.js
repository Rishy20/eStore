//Database Name
const DBNAME = process.env.DB_NAME;
//Collection Name
const COLLECTION = 'Sellers';
//Import the getClient method
const getClient = require("./connection");
//Import ObjectId
const {ObjectId} = require('mongodb');

let sellers;

//Establish the connection
getClient().then(data=>{
    sellers = data.db(DBNAME).collection(COLLECTION);
}).catch(err=>{
    console.error(err);
});

//Save method
const save = async (seller) => {
    //Insert data to the db
    const result = await sellers.insertOne(seller);
    return result.insertedId;
}
//GetAll method
const getAll = async () =>{
    const cursor = await sellers.find();
    return cursor.toArray();
}
//GetById method
const getById = async (id) =>{
    return await sellers.findOne({_id:ObjectId(id)});
}
//Delete method
const removeById = async id =>{
    const result = await sellers.deleteOne({_id:ObjectId(id)});
    return result.deletedCount;
}
//Update method
const update = async (id, seller) =>{
    const result = await sellers.replaceOne({_id:ObjectId(id)}, seller);
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
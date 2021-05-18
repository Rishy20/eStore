// Database name
const DBNAME = process.env.DB_NAME;
// Collection name
const COLLECTION = 'Products';
// Import the getClient method
const getClient = require('./connection');
// Import ObjectId
const {ObjectId} = require('mongodb');

let products;

// Establish the connection
getClient().then(data => {
    products = data.db(DBNAME).collection(COLLECTION);
}).catch(err => {
    console.error(err);
});

// Add a product
const save = async product => {
    const result = await products.insertOne(product);
    return result.insertedCount;
}

// Get all products
const getAll = async () => {
    const cursor = await products.find();
    return cursor.toArray();
}

// Get a product by ID
const getById = async id => {
    return await products.findOne({_id: ObjectId(id)});
}

// Delete a product by ID
const removeById = async id => {
    const result = await products.deleteOne({_id: ObjectId(id)});
    return result.deletedCount;
}

// Update a product
const update = async (id, product) => {
    const result = await products.replaceOne({_id: ObjectId(id)}, product);
    return result.modifiedCount;
}
//Get products of sellers
const getBySeller = async (id)=>{
    const cursor = await products.find({sellerId:id});
    return cursor.toArray();
}
//Search product by name
const getByName = async (name)=>{
    const cursor = await products.find({name:{'$regex' : name, '$options' : 'i'}});
    return cursor.toArray();
}
// Export the methods
module.exports = {
    getAll,
    getById,
    removeById,
    save,
    update,
    getBySeller,
    getByName
};
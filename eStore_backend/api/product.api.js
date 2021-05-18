// Import the methods
const {getAll, getById, removeById, save, update,getBySeller,getByName} = require('../dal/product.dao');

// Map the save() method
const createProduct = async ({name, description, category, brand, sku, price, qty, img,sellerId}) => {
    // Create a product object
    const product = {name, sellerId, description, category, brand, sku, price, qty, img};

    // Call the save product method and pass the object
    let result = await save(product);

    if (result===1){
        return {status:"Success"}
    }
    return {status:"Fail",msg:"Product failed to be added to the db"}
}

// Map the getAll() method
const getProducts = async () => {
    return await getAll();
}

// Map the getById() method
const getProduct = async id => {
    return await getById(id);
}

// Map the removeById() method
const deleteProduct = async id => {
    return await removeById(id);
}

// Map the update() method
const updateProduct = async (id, {name, description, category, brand, sku, price, qty, img, sellerId}) => {
    // Create a product object
    const product = {name, sellerId, description, category, brand, sku, price, qty, img};

    // Call the update product method and pass the object
    let result = await update(id, product);

    if (result===1){
        return {status:"Success"}
    }
    return {status:"Fail",msg:"Product Update Failed"}
}
// Map the getAll() method
const getProductBySeller = async (id) => {
    return await getBySeller(id);
}
const searchProduct = async (name)=>{
    return await getByName(name);
}
// Export the methods
module.exports = {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    getProductBySeller,
    searchProduct
};
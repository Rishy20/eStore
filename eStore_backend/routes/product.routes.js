// Import Koa Router
const Router = require('@koa/router');
// Import the API methods
const {createProduct, getProducts, getProduct, deleteProduct, updateProduct ,getProductBySeller,searchProduct} = require('../api/product.api');

//Import multer to handle image uploads
const multer = require('@koa/multer');

//Import mime to return images as responses
const mime = require('mime-types');
const fs = require('fs');
//Import jwt to authenticate user
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

//Define the storage path of the product images
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
//Create a multer object
const upload = multer({storage:storage});

// Create router object
const router = new Router({
    prefix: '/api/v1/products'
});


//Method to Verify the JSON web Token
async function verifyJWT(ctx,next){
    //Get the access token from the header
    const token = ctx.request.headers["x-access-token"];
    //Check if token exists in the header
    if(!token){
        ctx.response.status = 401
        ctx.body = {auth:false, msg:"Token Missing"}
    }else{
        //Verify the toke
        await jwt.verify(token,secret, async (err,decode)=>{
            //Check if token is invalid
            if(err){
                ctx.response.status = 401
                ctx.body = {auth:false, msg:"Invalid token"}
            }else{
                //Check if the User is a Seller
                if(decode.userType === "Seller"){
                    ctx.request.sellerId = decode.id;
                    await next()
                }else{
                    ctx.response.status = 403
                    ctx.body = {auth:false, msg:"Access Denied"}
                }

            }
        })
    }
}

// Get all products route
router.get('/',async ctx => {
    ctx.response.status = 200;
    ctx.body = await getProducts();
});

// Add a product route, Only Sellers have access to this route, verifyJWT method is used to authenticate this route
router.post('/',verifyJWT,upload.single('image'), async ctx => {

    try {
        //Get the values from the request
        const values = JSON.parse(ctx.request.body.values);
        //Create a product object with the seller Id
        let product = {...values, sellerId: ctx.request.sellerId};
        product = await createProduct(product);

        //Check if Product addition is failed
        if(product.status==="Fail"){
            ctx.response.status = 400;
        }else{
            ctx.response.status = 200;
        }

        ctx.body = product;
    }catch (e){
        console.log(e);
        ctx.response.status = 401;
    }
});
// Returns the products of the seller, Only Sellers have access for this route
router.get('/seller',verifyJWT,async ctx => {
    //Get the Seller id from the request added by the verifyJWT method
    const id = ctx.request.sellerId;
    ctx.response.status = 200;
    ctx.body = await getProductBySeller(id);
});
// Search Products by name
router.get('/search/:name',async ctx => {

    const name = ctx.params.name;
    ctx.response.status = 200;
    ctx.body = await searchProduct(name);
});
// Get product images by name
router.get('/image/:name',async ctx => {
    //Get the name from the parameter
    let name = ctx.params.name
    //Deine the Image Path
    let path= `./public/images/${name}`;
    //Create a mime of the image
    let mimetype = mime.lookup(path);
    //Create a readable Stream of the image
    const src = fs.createReadStream(path)
    //Set the content type of the response header
    ctx.response.set("content-type", mimetype);
    //Send the image as the response
    ctx.body = src;
});

// Get product by ID route
router.get('/:id', async ctx => {
    const id = ctx.params.id;
    ctx.body = await getProduct(id);
});

// Delete product by ID route, Only Sellers have access to this route
router.delete('/:id',verifyJWT,async ctx => {
    const id = ctx.params.id;
    ctx.body = await deleteProduct(id);

});

// Update product route, only sellers have access to this route
router.put('/:id',verifyJWT,upload.single('image'), async ctx => {
    const id = ctx.params.id;
    try {
        //Get the values from the request
        const values = JSON.parse(ctx.request.body.values);
        //Create a product object with the seller Id
        let product = {...values, sellerId: ctx.request.sellerId};
        product = await updateProduct(id, product);

        //Check if Product addition is failed
        if(product.status==="Fail"){
            ctx.response.status = 400;
        }else{
            ctx.response.status = 200;
        }

        ctx.body = product;
    }catch (e){
        console.log(e);
        ctx.response.status = 401;
    }
});


// Export the routes
module.exports = router;
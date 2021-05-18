//Import Koa router
const Router = require("@koa/router");
//Import api methods
const {createBuyer, getBuyer, getBuyers,updateBuyer,deleteBuyer} =  require('../api/buyer.api');

const router = new Router({
    //route prefix
    prefix:'/api/v1/buyers'
})
//Get All route
router.get('/',async ctx=>{
    ctx.body= await getBuyers() ;
})
//Insert route
router.post('/',async ctx=>{
    //Store the request in a variable
    let buyer = ctx.request.body;
    buyer = await createBuyer(buyer);
    //Check if the request is successful
    if(buyer.status==="Fail"){
        ctx.response.status = 400;
    }else{
        ctx.response.status = 200;
    }
    //Return the response
    ctx.body = buyer;
})
//Get By Id route
router.get('/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body = await getBuyer(id);
})
//Delete by id route
router.delete('/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body = await deleteBuyer(id);

})
//Update Route
router.put('/:id',async ctx=>{
    //Get the id from the parameter
    const id = ctx.params.id;
    let buyer = ctx.request.body;
    buyer = await updateBuyer(id,buyer);
    //Check if the request is successful
    if(buyer.status==="Fail"){
        ctx.response.status = 400;
    }else{
        ctx.response.status = 200;
    }
    ctx.body = buyer;
})
//Export the routes
module.exports = router;
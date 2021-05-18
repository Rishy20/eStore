//Import Koa router
const Router = require("@koa/router");
//Import api methods
const {createSeller, getSeller, getSellers,updateSeller,deleteSeller} =  require('../api/seller.api');


const router = new Router({
    //route prefix
    prefix:'/api/v1/sellers'
})
//Get All route
router.get('/',async ctx=>{
    ctx.body= await getSellers() ;
})

//Insert route
router.post('/',async ctx=>{
    let seller = ctx.request.body;
    seller = await createSeller(seller);
    //Check if the request is successful
    if(seller.status==="Fail"){
        ctx.response.status = 400;
    }else{
        ctx.response.status = 200;
    }
    ctx.body = seller;
})
//Get By Id route
router.get('/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body = await getSeller(id);
})
//Delete by id routes
router.delete('/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body = await deleteSeller(id);

})
//Update Route
router.put('/:id',async ctx=>{
    const id = ctx.params.id;
    let seller = ctx.request.body;
    seller = await updateSeller(id,seller);
    //Check if the request is successful
    if(seller.status==="Fail"){
        ctx.response.status = 400;
    }else{
        ctx.response.status = 200;
    }
    ctx.body = seller;
})
//Export the routes
module.exports = router;
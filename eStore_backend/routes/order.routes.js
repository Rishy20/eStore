//Import Koa router
const Router = require("@koa/router");
//Import api methods
const {createOrder, getOrder, getOrders,deleteOrder} =  require('../api/order.api');


const router = new Router({
    //route prefix
    prefix:'/api/v1/orders'
})
//Get All route
router.get('/',async ctx=>{
    ctx.body= await getOrders() ;
})
//Insert route
router.post('/',async ctx=>{
    let order = ctx.request.body;
    order = await createOrder(order);

    //Check if order is Fail
    if(order.status==="Fail"){
        ctx.response.status = 400;
    }else{
        ctx.response.status = 200;
    }
    //Set Response Headers
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    ctx.body = order;
})
//Get By Id route
router.get('/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body = await getOrder(id);
})
//Delete by id route
router.delete('/:id',async ctx=>{
    const id = ctx.params.id;
    ctx.body = await deleteOrder(id);

})

//Export the routes
module.exports = router;
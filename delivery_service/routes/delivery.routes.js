//Import Koa router
const Router = require("@koa/router");
//Import api methods
const createDelivery =  require('../api/delivery.api');
const {checkApiKey} = require('../api/users.api')


const router = new Router({
    //route prefix
    prefix:'/api/v1/delivery'
})

//Insert route
router.post('/',async ctx=>{

    //Get api Key from header
    let apikey = ctx.request.headers["x-api-key"];
    //Check if api key exist in the header
    if(apikey){
        //Check if api key is valid
        if(await checkApiKey(apikey)){
            //Get Delivery details from the request
            let delivery = ctx.request.body;
            //Call createDelivery() method to validate and save the delivery details in the db
            delivery = await createDelivery(delivery);
            //Check if delivery is failed
            if(delivery.status==="Fail"){
                ctx.response.status = 400;
            }else{
                ctx.response.status = 200;
            }
            //Return delivery id
            ctx.body = delivery;

        }else{
            //Respond with an error message
            ctx.response.status = 401;
            ctx.body = {status:"Fail",auth:false,message:"Failed to authenticate Delivery Api key"}
        }
    }else{
        //Respond with an error message
        ctx.response.status = 401;
        ctx.body = {status:"Fail",auth:false,message:"No api key provided for Delivery Gateway"};
    }

})

//Export the routes
module.exports = router;
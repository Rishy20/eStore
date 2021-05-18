//Import Koa router
const Router = require("@koa/router");
//Import api methods
const createPayment =  require('../api/payment.api');
const checkApiKey = require('../api/users.api')

const router = new Router({
    //route prefix
    prefix:'/api/v1/payment'
})

//Insert route
router.post('/',async ctx=>{
    //Get api Key from header
    let apikey = ctx.request.headers["x-api-key"];
    //Check if api key exist in the header
    if(apikey){
        //Check if api key is valid
        if(await checkApiKey(apikey)){
            //Get Payment details from the request
            let payment = ctx.request.body;
            //Call createPayment() method to validate and save the payment details in the db
            payment = await createPayment(payment);
            //Check if payment is failed
            if(payment.status==="Fail"){
                ctx.response.status = 400;
            }else{
                ctx.response.status = 200;
            }
            //Return Payment id
            ctx.body = payment;

        }else{
            //Respond with an error message
            ctx.response.status = 401;
            ctx.body = {status:"Fail",auth:false,message:"Failed to authenticate Payment Api key"}
        }
    }else{
        //Respond with an error message
        ctx.response.status = 401;
        ctx.body = {status:"Fail",auth:false,message:"No api key provided for Payment Gateway"}
    }

})

//Export the routes
module.exports = router;
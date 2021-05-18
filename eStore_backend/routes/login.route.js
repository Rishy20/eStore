//Import Koa router
const Router = require("@koa/router");
//Import api methods
const authenticateUser =  require('../api/login.api');


const router = new Router({
    //route prefix
    prefix:'/api/v1/login'
})

//Insert route
router.post('/',async ctx=>{
    let user = ctx.request.body;

    user = await authenticateUser(user);
    //Check if login is successful
    if(user.auth){
        ctx.response.status = 200;
    }else{
        ctx.response.status = 401;
    }

    ctx.body = user;
})

//Export the routes
module.exports = router;
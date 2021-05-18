//Import Koa
const Koa = require('koa');
//Import body-parser
const bodyParser = require('koa-bodyparser');
//Import the routes
const mobileRoutes = require('./routes/mobilepayment.routes');

//Import cors
const cors = require('@koa/cors');

//Start app
const app = new Koa();
//Use BodyParser
app.use(bodyParser());

//Use cors
app.use(cors());

//Registering the mobile routes
app.use(mobileRoutes.routes()).use(mobileRoutes.allowedMethods());



//Setup the port
app.listen(3002);
console.log("Application is running on port 3002");
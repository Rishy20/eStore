//Import Koa
const Koa = require('koa');
//Import body-parser
const bodyParser = require('koa-bodyparser');
//Import the routes
const deliveryRoutes = require('./routes/delivery.routes');

//Import cors
const cors = require('@koa/cors');



//Start app
const app = new Koa();
//Use BodyParser
app.use(bodyParser());

//Use cors
app.use(cors());

//Registering the Delivery routes
app.use(deliveryRoutes.routes()).use(deliveryRoutes.allowedMethods());



//Setup the port
app.listen(3003);
console.log("Application is running on port 3003");
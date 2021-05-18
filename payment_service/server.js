//Import Koa
const Koa = require('koa');
//Import body-parser
const bodyParser = require('koa-bodyparser');
//Import the routes
const paymentRoutes = require('./routes/payment.routes');

//Import cors
const cors = require('@koa/cors');

//Start app
const app = new Koa();
//Use BodyParser
app.use(bodyParser());

//Use cors
app.use(cors());

//Registering the Payment routes
app.use(paymentRoutes.routes()).use(paymentRoutes.allowedMethods());



//Setup the port
app.listen(3001);
console.log("Application is running on port 3001");
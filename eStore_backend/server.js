//Import Koa
const Koa = require('koa');
//Import body-parser
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');


//Import the routes
const sellerRoutes = require('./routes/seller.routes');
const buyerRoutes = require('./routes/buyer.routes');
const orderRoutes = require('./routes/order.routes')
const productRoutes = require('./routes/product.routes');
const loginRoutes = require('./routes/login.route')
//Import cors
const cors = require('@koa/cors');

//Start app
const app = new Koa();

//Use cors
app.use(cors());
//Use BodyParser
app.use(bodyParser());

//Serve static files
app.use(serve("./public/images"))

//Registering the Seller routes
app.use(sellerRoutes.routes()).use(sellerRoutes.allowedMethods());
//Registering the Buyer routes
app.use(buyerRoutes.routes()).use(buyerRoutes.allowedMethods());
//Registering the order routes
app.use(orderRoutes.routes()).use(orderRoutes.allowedMethods());
//Registering the login routes
app.use(loginRoutes.routes()).use(loginRoutes.allowedMethods());
//Registering the Product routes
app.use(productRoutes.routes()).use(productRoutes.allowedMethods());


//Setup the port
app.listen(3000);
console.log("Application is running on port 3000");
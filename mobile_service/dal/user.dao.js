//Database Name
const DBNAME = process.env.DB_NAME;
//Collection Name
const COLLECTION = 'Users';
//Import the getClient method
const getClient = require("./connection");


let users;

//Establish the connection
getClient().then(data=>{
    users = data.db(DBNAME).collection(COLLECTION);
}).catch(err=>{
    console.error(err);
});

//Get Api Key method
const authenticateKey = async (key) => {
    //Check if a user with Api key exists
    const result = await users.findOne({apiKey:key});
    return result;
}


//Export the methods
module.exports = authenticateKey;

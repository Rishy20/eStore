//Import the methods
const authenticateKey = require("../dal/user.dao");


//Map the auntheticateKey() method
const checkApiKey = async (key) => {

    //Check if the api key is valid
   if(await authenticateKey(key)){
       return true;
   }else{
       return false;
   }
}

//Export the methods to be used in routes
module.exports = {
    checkApiKey
}

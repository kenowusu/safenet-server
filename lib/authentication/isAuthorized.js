
const {tokenExists,tokenIsValid,decodeToken,tokenNotValid} = require('./util/token');

const isAuthorized = (req,res,next)=>{

  //check if user's token is valid
  console.log(tokenIsValid(req,res));
}



exports.isAuthorized = isAuthorized;

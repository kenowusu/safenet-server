
const {tokenExists,tokenIsValid,decodeToken,tokenNotValid} = require('./util/token');

const isAuthorized = (req,res,next)=>{

    //check if user's token is valid
    if(!tokenIsValid(req,res)){
      tokenNotValid(req,res);
    }

    next();
}



exports.isAuthorized = isAuthorized;

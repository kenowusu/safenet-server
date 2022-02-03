
const {tokenIsValid,tokenNotValid} = require('./util/token');

const isAuthorized = (req,res,next)=>{
    //check if user's token is valid
    if(!tokenIsValid(req,res)){
      tokenNotValid(req,res);
    }else{
      next();
    }

    
}



exports.isAuthorized = isAuthorized;

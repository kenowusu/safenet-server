
const {tokenIsValid,tokenNotValid} = require('./util/token');

const isAuthenticated = (req,res,next)=>{
    

    if(!tokenIsValid(req,res)){
      tokenNotValid(req,res);
    }else{
      return next();
    }

  
}



export default isAuthenticated;




const isAuthorized = (req,res,next)=>{
  if(!tokenIsValid){
    res.status(401);
    return send({message:"Not authorized"});
  }

  const decodedToken = decodeToken(res,res);
  res.locals.userId =  decodeToken.userId;

}



exports.isAuthorized = isAuthorized;

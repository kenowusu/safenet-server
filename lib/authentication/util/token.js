const e = require('express');
const jwt = require('jsonwebtoken');
let jwtSecret  = process.env.JWT_SECRET;



//generate token when authenticating user
const generateToken = (userId)=>{
  const expiresIn = "3 hour";
  const token = jwt.sign({userId:userId},jwtSecret,{expiresIn:expiresIn});
  return (token);

}





//check wether generated token is valid or not expired
const tokenIsValid = (req,res)=>{
    let  token = req.cookies.tk;
      try{
        let isValid = jwt.verify(token,jwtSecret);
        return true;
      }catch{
        return false;
      }
   

}


//token is not tokenNotValid / send message whenever unauthorized
const tokenNotValid = (req,res)=>{
  return res.status(401).send({
    isAuthenticated:false,
    message:"Log in to continue"
  });
}






exports.generateToken = generateToken;
exports.tokenIsValid = tokenIsValid;
exports.tokenNotValid = tokenNotValid;

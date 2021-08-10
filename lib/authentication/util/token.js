const jwt = require('jsonwebtoken');
let jwtSecret  = process.env.BCRYPT_SECRET;




const generateToken = (userId)=>{
  const expiresIn = "1 hour";
  const token = jwt.sign({userId:userId},jwtSecret,{expiresIn:expiresIn});
  return (token);

}

const decodeToken = (req,res)=>{
  const token = req.cookies.tk;
  if(!token || !tokenIsValid(req,res) ){
    return res.send({error:"Unauthorized. You are not logged in"});
  }
  return jwt.decode(token);
}

const tokenIsValid = (req,res)=>{
  const token = req.cookies.tk;
  let isValid = jwt.verify(token,jwtSecret);
  return (isValid) ? true : false;
}





exports.decodeToken = decodeToken;
exports.generateToken = generateToken;
exports.tokenIsValid = tokenIsValid;

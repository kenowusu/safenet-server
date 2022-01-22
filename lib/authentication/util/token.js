const jwt = require('jsonwebtoken');
let jwtSecret  = process.env.BCRYPT_SECRET;



//generate token when authenticating user
const generateToken = (userId)=>{
  const expiresIn = "1 hour";
  const token = jwt.sign({userId:userId},jwtSecret,{expiresIn:expiresIn});
  return (token);

}


//check if there is token present;
const tokenExists = (req,res)=>{
  const token = req.cookies.tk;
  return token ? true : false;
}


//check wether generated token is valid or not expired
const tokenIsValid = (req,res)=>{
    let  token = req.cookies.tk;

    //check if there is token and token is not undefined
    if(!token || typeof token === "undefined" || token.length < 1){
      return false;
    }else{
      let isValid = jwt.verify(token,jwtSecret);
      return (isValid) ? true: false;
    }

}


//token is not tokenNotValid / send message whenever unauthorized
const tokenNotValid = (req,res)=>{
  return res.status(403).send({
    isAuthenticated:false,
    message:"Log in to continue"
  });
}

//decode token when token is valid
const decodeToken = (req,res)=>{
  let  token = req.cookies.tk;
  if(tokenIsValid(req,res) ){
    return jwt.decode(token);
  }else{
    tokenNotValid(req,res);
  }

}




exports.generateToken = generateToken;
exports.tokenExists = tokenExists;
exports.tokenIsValid = tokenIsValid;
exports.decodeToken = decodeToken;
exports.tokenNotValid = tokenNotValid;

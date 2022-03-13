const jwt = require('jsonwebtoken');
let jwtSecret  = process.env.JWT_SECRET;




//generate token when authenticating user
const generateUserToken = (userId)=>{
    const expiresIn = "3 hour";
    const token = jwt.sign({userId:userId},jwtSecret,{expiresIn:expiresIn});
    return (token);
  
  }
  
  export default generateUserToken;
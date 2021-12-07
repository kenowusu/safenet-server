const jwtSecret  = process.env.BCRYPT_SECRET;
const jwt = require('jsonwebtoken');


const getUserId = (req,res)=>{
  const token  = req.cookies.tk;
  let decoded = jwt.verify(token,jwtSecret);
  return decoded.userId;
}


module.exports.getUserId = getUserId;

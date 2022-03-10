const jwtSecret  = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');


const getUserId = (req,res)=>{
  const token  = req.cookies.tk;
  let decoded = jwt.verify(token,jwtSecret);
  return decoded.userId;
}


export default getUserId;

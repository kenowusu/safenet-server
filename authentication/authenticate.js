const jwt = require('jsonwebtoken');
const {User} = require('../database/models/user');
const bcrypt = require('bcrypt');


const authenticate = (req,res,next)=>{

   const {email,password}  = req.body;

   let error = {error:"Email or Password incorrect"};

   User.findOne({where:{email:email}})
   .then((user)=>{
     if(!user){
       return res.send(error)
     }

     // if user exists check Password
   const correctPassword =    bcrypt.compare(password,user.password);

   correctPassword
   .then((isCorrect)=>{
     if(!isCorrect){
       // if not correct send user authentication error
       return res.send(error);
     }else{
       //create token for user
        const privateKey = process.env.BCRYPT_SECRET;
        const expiresIn = "1 hour";
        const token = jwt.sign({userId:user.id},privateKey,{expiresIn:expiresIn});
        return res.send(token);

     }
   })//correctPassword

 }) // User.findOne

   next();
}











module.exports.authenticate = authenticate;

const jwt = require('jsonwebtoken');
const {User} = require('../../database/models/user');
const bcrypt = require('bcrypt');
const {generateToken} = require('./util/token');

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
       const userId = user.id;
       const token = generateToken(userId);
       // return res.send({token:token});

       //store token in cookie
       res.cookie('tk',token);
       res.send({message:"Successfully authenticated"})
     }
   })//correctPassword

 }) // User.findOne

   next();
}











module.exports.authenticate = authenticate;

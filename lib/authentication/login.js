const jwt = require('jsonwebtoken');
const {User} = require('../../database/models/user');
const bcrypt = require('bcrypt');
const {generateToken} = require('./util/token');
const ash = require('express-async-handler');

import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import normalizeEmail from 'validator/lib/normalizeEmail';


const login = ash( async(req,res,next)=>{

   const  {email,password}  = req.body;
   
   //check if email and password exists 
  if(!email || !password ||  isEmpty(email) || isEmpty(password) || !isEmail(email)  ){
    return res.status(401).send({message:"invalid input email or password"});
  }


   
  //sanitize email and password
  const email_sanitized = await normalizeEmail(email,{all_lowercase:true})
  

  //invalid email and password error
  const invalid_email_password = {message:"Invalid email or pasword"}
  const server_email_error = {message:"server error. please try again"}
   

  const findUser = await  User.findOne({where:{email:email}});
  
  //if email not found send 401 error
  if(!findUser){
    return res.status(401).send(invalid_email_password);
  }
  
   
  const foundUser = findUser.toJSON();

  // if user exists check Password
  const passwordIsCorrect = await   bcrypt.compare(password,foundUser.password);
  
   //if password not correct send 401 error
  if(!passwordIsCorrect){
    return res.status(401).send(invalid_email_password);
  }else{
    //found user send token and message

    const userId = foundUser.id;
    const token = generateToken(userId);

    res.send({
      token:token,
      isAuthenticated:true
    })
  }
   

   next();
})











module.exports.login = login;

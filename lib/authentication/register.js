 const {User} = require('../../database/models/user');
 const {v4: uuidv4} = require('uuid');
 const ash = require('express-async-handler');
 const {generateToken }  = require('../authentication/util/token');


import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';
import isEmpty from 'validator/lib/isEmpty';
import ltrim   from 'validator/lib/ltrim';
import rtrim   from 'validator/lib/rtrim';



const register = ash( async(req,res,next)=>{
  let {firstname,lastname,email,password} = req.body;
  


  //define firstname and lastname if undefined
  firstname = (firstname) ? firstname: "";
  lastname = (lastname) ? lastname: "";


  //trim firstname and lastname
  firstname = ltrim(firstname);
  firstname = rtrim(firstname);
  lastname =  ltrim(lastname);
  lastname =  rtrim(lastname);


  
  //check if isEmail and password not empty
  if(!isEmail(email) || isEmpty(password) ){
    return res.status(401).send({message:'Invalid field input'});
  }

  

  
  //sanitize email and password
  const email_sanitized = await normalizeEmail(email,{all_lowercase:true})
  

  //check if user with that email already exists;

  const userExists = await User.findOne({where:{email:email}})

  
  //if user exists, send error
  if(userExists){
    return res.status(403).send({message:"User already exists"})
  }


  // else create new User;
  let newUser = {
    id:uuidv4(),
    email:email_sanitized,
    password:password,
    first_name:firstname,
    last_name:lastname
  }
  
  let token = await generateToken(newUser.id);

  const createNewUser = User.create(newUser);
  createNewUser.then(createdUser=>{
    //send response after registration 
    return res.send({
      success:true,
      message:"User created successfully",
      token:token
    })
  })
  .catch(createUserError=> res.status(500).send({message:"Error registering user, please try again"}))
  
  



});
















module.exports.register  = register;

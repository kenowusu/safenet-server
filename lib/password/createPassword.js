
const validator = require('validator');
const {v4: uuidv4} = require('uuid');
const {Password}  = require('../../database/models/password');
import getUserId from '../authentication/util/getUserId';
const ash = require('express-async-handler');
const {encryptPassword} = require('./utils/encryptPassword');
const {parse} = require('tldts');

//====yup schema validator==//
import {object,string} from 'yup';
import isURL from 'validator/lib/isURL';


const createPassword = ash(async (req,res,next)=>{
  //url = the url of the website
  //username = username the user uses on the site(could be an email or username)
  //password = the password to be ecrypted
  //custom field = user would be adding custom field later()
  //custom filed takes boolean. It false by defaut. It would be changed to true when user adds custom fields later"
  //notes = notes about the website or app
  let {url,username,password,name,notes}  = req.body;
  const userId = getUserId(req,res);
  const custom_field = false;
  const folder_id = "";
  name = (!name) ? "" : name;
  notes = (!notes) ? "" : notes;
  url = (!url) ? "" : url;
  //get domain and subdomain
  const {domain,subdomain} = parse(url);
  
  
  
  //check wether url is valid 
  if(!isURL(url)){
    res.status(422)
    return res.send({
      error:true,
      message:"Url is not valid"
    })
  }

  //create new password object
    const newPassword = {
      id: uuidv4(),
      name:name,
      url:url,
      domain:domain,
      subdomain:subdomain,
      username:username,
      password:password,
      custom_field:custom_field,
      notes:notes,
      user_id: userId,
      folder_id: folder_id
   }
   
   
  //========== new password validation shema for yup
  const passValSchema = object().shape({
    name:string().required(),
    username:string().required(),
    password:string().required(),
  })
  //=================schema values for yup
  const passVal = {
    name: newPassword.name,
    username: newPassword.username,
    password:newPassword.password
  }
  
  //======validate shema
  const passIsValid = await passValSchema.isValid(passVal);
  

  //=============if no errros create password============//
  if(passIsValid){
    
    //=====create password==========//
    newPassword.password = encryptPassword(newPassword.password)
    const createNewPassword = Password.create(newPassword)
  
    createNewPassword.then((newpassword)=>{
      //===========send response when password is created successfully
      return res.send({
        success:true,
        message:"Password created successfully",
        password:newpassword
      })
    })
    .catch(function(error){
      return next(error);
    })
  }else{
    //=============else send error===================//
     passValSchema.validate(passVal)
     .catch((valerr)=>{

    res.status(422);
        return res.send({
          error:true,
          message:valerr.message

        })
     })

   
  }

  



});



exports.createPassword = createPassword



const {Password}  = require('../../database/models/password');
const ash= require('express-async-handler');
const {parse} = require('tldts');


//====yup schema validator==//
import {object,string} from 'yup';
import isURL from 'validator/lib/isURL';
const {encryptPassword} = require('./utils/encryptPassword');
import getUserId from '../authentication/util/getUserId';

const updatePassword = ash( async(req,res,next)=>{


  let {id,url,username,password,name,notes}  = req.body;
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
      name:name,
      url:url,
      domain:domain,
      subdomain:subdomain,
      username:username,
      password:password,
      custom_field:custom_field,
      notes:notes,
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
  

  //=============if no errros update password============//
  if(passIsValid){
    
    //=====update password==========//
    newPassword.password = encryptPassword(newPassword.password)
    const updatePassword = Password.update(newPassword,{where:{id:id,user_id:userId}});
  
    updatePassword.then((newpassword)=>{
      //===========send response when password is updated successfully
      //mutate response as sequelize does not return updated records in mysql
      newPassword.id = id;
      newPassword.user_id = userId;
      return res.send({
        success:true,
        message:"Password  updated successfully",
        password:newPassword
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


})

export default updatePassword;


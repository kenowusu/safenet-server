const {isAuthorized}  = require('../authentication/isAuthenticated');
const {Password}  = require('../../database/models/password');
const {Folder}  = require('../../database/models/folder');
const asyncHandler = require('express-async-handler');
import getUserId from '../authentication/util/getUserId';
import decryptPassword from './utils/decryptPassword';

const getPassword = asyncHandler(async(req,res,next)=>{
  const userId = getUserId(req,res);

  //get a single Password

  //get Password
  let passwordId = req.params.passwordId;
   console.log(passwordId)
  
  //=========send error when password not found ========//
  if(!passwordId){
    res.status(400)
    return res.send({
      error:true,
      message:"Password not found"
    })
  }

 
  //=======find Password=======================
  let findPassword = await Password.findOne({
    where:{user_id:userId,id:passwordId},
    include:Folder
  })

  
  //=========send password when found==================
  //======decrypt password before sending========//
  findPassword.password = decryptPassword(findPassword.password)
  return res.send({
    success:true,
    password:findPassword
  });


});

module.exports.getPassword = getPassword;

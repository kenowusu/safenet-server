
const {v4: uuidv4} =  require('uuid');
const {isEmptyObject} = require('../util/object');
import isEmpty from 'validator/es/lib/isEmpty';
const ash = require('express-async-handler');
const {Folder} = require('../../database/models/folder');
import getUserId from '../authentication/util/getUserId';





const getFolders = ash( async(req,res,next)=>{

  //===================parameters=================
  /*
   //user_id - user_id of user
  */
  const user_id = getUserId(req,res);

  //===============check if user is not empty===================//
  if(!user_id){
      res.status(422);
      return res.send({
          error:true,
          message:"Bad request"
      })
  }

 //==================find user folders ==============================//
 const findFolders = Folder.findAll({where:{user_id:user_id}})
 .then((folders)=>{
    return res.send({
        success:true,
        folders:folders
    })
 }).catch((foldersErr)=> next(foldersErr));
    



});


export default getFolders;
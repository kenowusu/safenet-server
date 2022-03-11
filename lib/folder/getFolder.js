
const {v4: uuidv4} =  require('uuid');
const {isEmptyObject} = require('../util/object');
import isEmpty from 'validator/es/lib/isEmpty';
const ash = require('express-async-handler');
const {Folder} = require('../../database/models/folder');
import getUserId from '../authentication/util/getUserId';





const getFolder = ash( async(req,res,next)=>{
  //===================parameters=================
  /*
   *user_id - user_id of user
   *folder_id - id of folder
  */
  const user_id = getUserId(req,res);
  const id   = req.params.folder_id;
  

  //===============send error if folder_id or user_id is undefined============
  if(!user_id || !id){
      res.status(400);
      return res.send({
          error:true,
          message:"Bad request"
      })
  }

  
  //===============find folder===================//
  const findFolder = Folder.findOne({where:{id,user_id}});
  findFolder.then((folder)=>{
      return res.send({
          success:true,
          folder:folder
      });
  }).catch((folderErr)=>next(folderErr))


});


export default getFolder;
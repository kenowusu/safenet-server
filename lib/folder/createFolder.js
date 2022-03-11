
const {v4: uuidv4} =  require('uuid');
const {isEmptyObject} = require('../util/object');
import isEmpty from 'validator/es/lib/isEmpty';
const ash = require('express-async-handler');
const {Folder} = require('../../database/models/folder');
import getUserId from '../authentication/util/getUserId';










module.exports.createFolder = ash( async(req,res,next)=>{

  //===================parameters=================
  /*
   //name - name of folder
   //user_id - user_id of user
  */
  const user_id = getUserId(req,res);
  let {name}    = req.body;

  //===============send error if name not empty===================//
   if(!name){
     res.status(422);
     return res.send({
       error:true,
       message:"Provide folder name"
     })
   }
   

  //===============check if a folder with that name exists===================//
  const findFolderName = await Folder.findOne({where:{name:name}});

   if(findFolderName){
     res.status(422);
     return res.send({
       error:true,
       message:"Folder already exists"
     })
   }




   //==================if folder not found, create folder ==============================//
  const createNewFolder = Folder.create({
    id: uuidv4(),
    name,
    user_id:user_id
  });

  createNewFolder.then((folder)=>{
    //===========find all folders with username ==================//
    const findUserFolders = Folder.findAll({where:{user_id:user_id}});
    findUserFolders.then((folders)=>{
      
      //send created folder and folders to user//
      return res.send({
        success:true,
        folder:folder,
        folders:folders
      })

    }).catch(foldersErr=> next(foldersErr))
  }).catch(folderErr=> next(folderErr))
  
   


});

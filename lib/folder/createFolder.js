
const {v4: uuidv4} =  require('uuid');
const {isEmptyObject} = require('../util/object');
import isEmpty from 'validator/es/lib/isEmpty';
const {Folder} = require('../../database/models/folder');










module.exports.createFolder = (req,res,next)=>{
  let {name}    = req.body;
  let folderErrors = {};


  name = (!name) ? "" : name;



  folderErrors = (isEmpty(name)) ? Object.assign(folderErrors,{folderNameEmpty:"Folder name is empty"}) : folderErrors;

  if(!isEmptyObject(folderErrors)){
    return res.send(folderErrors)
  }

  //check if a folder with that name exists

  Folder.findOne({where:{name:name}})
  .then((folder)=>{
    if(folder){
      folderErrors =  Object.assign(folderErrors,{folderNameExists:"Folder already exists"});
      return res.send(folderErrors)
    }else{
          //create new folder

          const newFolder = {
            id: uuidv4(),
            name:name
          }

          const createNewFolder = Folder.create(newFolder);


          createNewFolder
          .then((newfolder)=>{
            return res.send({message:"Folder created successfully"})
          })
          .catch((err)=>{
            return console.log(err.message)
          })
    }//else
  })// Folder.findOne



}

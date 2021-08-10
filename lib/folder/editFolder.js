const {v4: uuidv4} =  require('uuid');
const {isEmptyObject} = require('../util/object');
import isEmpty from 'validator/es/lib/isEmpty';
const {Folder} = require('../../database/models/folder');







const editFolder = (req,res,next)=>{

   const id = req.params.id;
   let {name} = req.body;
   name = (!name) ? "" : name;

   if(isEmpty(name)){
     return res.send({FolderNameEmpty:"Folder name must not be empty"});
   }
   const updateFolder = Folder.update(
     {name:name},
     {where:{id:id}}
   );

   updateFolder
   .then((updatedfolder)=>{
     return res.send({message:"Folder updated successfully"});
   })
   .catch((err)=>{
     console.log(err.message)
   })

}




















exports.editFolder = editFolder;

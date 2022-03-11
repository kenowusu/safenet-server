const {v4: uuidv4} =  require('uuid');
import isEmpty from 'validator/es/lib/isEmpty';
const {Folder} = require('../../database/models/folder');







const editFolder = (req,res,next)=>{

   const id = req.params.id;
   let {name} = req.body;
   name = (!name) ? "" : name;


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

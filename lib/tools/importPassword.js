const ash  = require('express-async-handler');
const multer = require('multer');
const path  = require('path');
const {v4: uuidv4} = require('uuid');
const fs = require('fs');
const readline = require('readline');
const {parse} = require('tldts');
import getUserId from '../authentication/util/getUserId';

const {Password}  = require('../../database/models/password');
const {encryptPassword} = require('../password/utils/encryptPassword');






const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,path.join(__dirname,'/../../uploads'));
    },
    filename:(req,file,cb)=>{
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

export const upload = multer({storage:storage});






const importPassword = ash(async(req,res,next)=>{
   
   if(!req.file){
     return res.send({error:true,message:"No file selected"});
   }
   
   const filename = req.file.filename;

  //get csv
   const image = __dirname +'/../../uploads/'+filename;
   
   //readfline line by line
   const rl = readline .createInterface({
     input: fs.createReadStream(image)
   })
   
   //read linebyline and insert into database;
   const waitReadline = await rl.on('line',(line)=>{
     const passVal = line.split(',')

     //check if is not csv firstline: name,url,username,password
     if(passVal[0] !== "name" && passVal[1] !== "url" && passVal[2] !=="username" && passVal[3] !=="password"){
       //insert password 

       const name = passVal[0];
       const url  = passVal[1];
       const {domain,subdomain} = parse(url);
       const username = passVal[2];
       const password = passVal[3];
       const custom_field = false;
       const notes = "";
       const user_id = getUserId(req,res);

       //create Password
          const newPassword = {
            id: uuidv4(),
            name:name,
            url:url,
            domain:domain,
            subdomain:subdomain,
            username:username,
            password:encryptPassword(password),
            custom_field:custom_field,
            notes:notes,
            user_id: user_id
            
        }
       
       const insertPassword = Password.create(newPassword);

       
     }
   
   
    })//rl.on

    return res.send({success:true,message:"Password import done"});

   

})










export default importPassword;
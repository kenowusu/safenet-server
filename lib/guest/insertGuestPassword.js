const readline = require('readline');
const {parse} = require('tldts');
const fs = require('fs');
const path  = require('path');
const {v4: uuidv4} = require('uuid');
const {Password}  = require('../../database/models/password');
const {encryptPassword} = require('../password/utils/encryptPassword');





   /*Parameters
     **guestUserId
     **
     **
   */


const insertGuestPassword = (guestUserId)=>{

   

  const filename = "guestPasswords.csv";
  //get csv
  const passwordCsv = __dirname +'/'+filename;


   //readfline line by line
   const rl = readline .createInterface({
    input: fs.createReadStream(passwordCsv)
  })
  
  //read linebyline and insert into database;
  const waitReadline = rl.on('line',(line)=>{
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
     const user_id = guestUserId

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
}

export default insertGuestPassword;

const validator = require('validator');
const {v4: uuidv4} = require('uuid');
const {Password}  = require('../../database/models/password');
const {decodeToken} = require('../authentication/util/token');




//util fuctions

//check if object is isEmpty
const isEmptyObject = (obj)=>{
  return Object.keys(obj).length  === 0;
}


const createPassword = (req,res,next)=>{

  let {url,username,password,name,notes}  = req.body;
  //url = the url of the websit
  //username = username the user uses on the site(could be an email or username)
  //password = the password to be ecrypted
  //custom field = user would be adding custom field later()
  //custom filed takes boolean. It false by defaut. It would be changed to true when user adds custom fields later"
  //notes = notes about the website or app
  const custom_field = false;
  const folder_id = "";
  name = (!name) ? "" : name;
  notes = (!notes) ? "" : notes;
  url = (!url) ? "" : url;

  const decodedToken = decodeToken(req,res);
  const {userId}  = decodedToken;


    let passwordErrors = {}


  passwordErrors = (validator.isURL(url)) ? passwordErrors : Object.assign(passwordErrors,{urlNotValid:"Url is not valid"});

  if(!isEmptyObject(passwordErrors)){
    return res.send(passwordErrors)
  }

  //create Password
  const newPassword = {
     id: uuidv4(),
     name:name,
     url:url,
     username:username,
     password:password,
     custom_field:custom_field,
     notes:notes,
     user_id: userId,
     folder_id: folder_id
  }

  const createNewPassword = Password.create(newPassword)

  createNewPassword.then((newpassword)=>{
    return res.send(newpassword)
  })
  .catch(function(error){
    console.log(error.message);
  })
}



exports.createPassword = createPassword

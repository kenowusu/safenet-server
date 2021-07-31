
const validator = require('validator');







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

  name = (!name) ? "" : name;
  notes = (!notes) ? "" : notes;
  const custom_field = false;


    let passwordErrors = {}


  passwordErrors = (validator.isURL(url)) ? passwordErrors : Object.assign(passwordErrors,{urlNotValid:"Url is not valid"});

  if(!isEmptyObject(passwordErrors)){
    return res.send(passwordErrors)
  }



}



exports.createPassword = createPassword

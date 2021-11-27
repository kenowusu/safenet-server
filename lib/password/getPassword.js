const {isAuthorized}  = require('../authentication/isAuthorized');
const {Password}  = require('../../database/models/password');

const getPassword = (req,res,next)=>{
  //check wether user is authenticated

isAuthorized(req,res,next)

  //if authenticated get password id

// find password by id


//if not authenticted send authorized mail


}

module.exports.getPassword = getPassword;

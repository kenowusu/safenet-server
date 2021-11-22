const validator = require('validator');
const {v4: uuidv4} = require('uuid');
const {Password}  = require('../../database/models/password');
const {decodeToken} = require('../authentication/util/token');

const suggestPassword = (req,res,next)=>{

  let length = 6;
  let includeSymbols = false;
  let includeNumbers = false;
  let includeLowercase = false;
  let includeUppercase = false;
  let Exclude
}













module.exports.suggestPassword = suggestPassword;

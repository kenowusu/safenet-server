// const  AES = require("crypto-js").AES;
const AES_SECRET = process.env.AES_SECRET;
let CryptoJS = require('crypto-js')
const encryptPassword = (password)=>{
  var encrypted = CryptoJS.AES.encrypt(password, AES_SECRET);
  return encrypted.ciphertext.sigBytes

}


















module.exports.encryptPassword = encryptPassword;

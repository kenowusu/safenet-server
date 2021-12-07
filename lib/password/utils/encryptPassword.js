const cryptoJs = require('crypto-js');
const AES_SECRET = process.env.AES_SECRET;


const encryptPassword = (password)=>{
  //Encrypt password with AES
  let encryptedPassword = cryptoJs.AES.encrypt(password,AES_SECRET).toString();
  return encryptedPassword;
}













module.exports.encryptPassword = encryptPassword;

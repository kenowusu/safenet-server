const cryptoJs = require('crypto-js');
const AES_SECRET = process.env.AES_SECRET;

const decryptPassword = (password)=>{
  //decrypt Password with crypto-js AES
  let bytes  = cryptoJs.AES.decrypt(password, AES_SECRET);
  let plainPassword = bytes.toString(cryptoJs.enc.Utf8);
  return plainPassword;

}

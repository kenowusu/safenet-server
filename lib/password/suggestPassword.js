const validator = require('validator');
const {v4: uuidv4} = require('uuid');
const {Password}  = require('../../database/models/password');
const {decodeToken} = require('../authentication/util/token');

const suggestPassword = (req,res,next)=>{

   let {length,includeNumbers,includeLowercase,includeUppercase} = req.body;
   length = typeof length == "undefined" ? 8 : length
   includeSymbols = true;
   includeNumbers = true;
   includeLowercase = true;
   includeUppercase = true;


  let numberChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let upperChars  = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  let lowerChars  = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
  let symbolChars = ["!", "@", "#", "$", "%", "^", "&", "*", "_", "."];


  let includeChars = [numberChars,upperChars,lowerChars,symbolChars];
  let generatedPassword = [];


  for(let generator = 0;generator < length; generator++){

    //get index of next Array to from includeChars
     let nextCharArrayIndex = generator % includeChars.length;
     let nextCharArrayLength = includeChars[nextCharArrayIndex].length;
     let nextRandomCharIndex = Math.floor(Math.random() * nextCharArrayLength)

     let nextRandomChar = includeChars[nextCharArrayIndex[nextRandomCharIndex]]

     let nextCharArray = includeChars[nextCharArrayIndex];
     let randomChar = nextCharArray[nextRandomCharIndex];

     generatedPassword.push(randomChar);


  }


   return res.send({generatedPassword:generatedPassword});


}












module.exports.suggestPassword = suggestPassword;

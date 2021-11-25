const validator = require('validator');
const {Password}  = require('../../database/models/password');
const {decodeToken} = require('../authentication/util/token');

const suggestPassword = (req,res,next)=>{

let {length,includeNumbers,includeSymbols,includeLowercase,includeUppercase} = req.body;



  //parse values
  length = parseInt(length);

  //convert options to booleans
  includeNumbers = (includeNumbers === "true");
  includeSymbols = (includeSymbols === "true");
  includeLowercase = (includeLowercase === "true");
  includeUppercase = (includeUppercase === "true");

   //make sure option not null or undefined
   length =  (!length || typeof(length) != "number")  ? 8 : length;



   //do not allow null or undefined types

   includeNumbers = (typeof includeNumbers !== "boolean")  ? true : includeNumbers;
   includeSymbols = typeof includeSymbols !== "boolean"   ? true : includeSymbols;
   includeLowercase = typeof includeLowercase !== "boolean"  ? true : includeLowercase;
   includeUppercase = typeof includeUppercase !== "boolean"   ? true : includeUppercase;


   //make sure at least of the character choice options is chosen
   if(includeNumbers == false && includeSymbols == false && includeLowercase == false  && includeUppercase == false)
   {return res.status(401).send({message:"You must choose at least one character option"})}



  let numberChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let upperChars  = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  let lowerChars  = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
  let symbolChars = ["!", "@", "#", "$", "%", "^", "&", "*", "_", "."];




  //include and exclude user password options
  numberChars = (includeNumbers) ? numberChars : false;
  symbolChars = (includeSymbols) ? symbolChars : false;
  lowerChars  = (includeLowercase) ? lowerChars : false;
  upperChars  = (includeUppercase) ? upperChars :false;

  let includeChars = [numberChars,upperChars,lowerChars,symbolChars];
  let generatedPassword = [];


  includeChars = includeChars.filter(char=>{
    if(typeof char !== false){return char}
  })

  for(let generator = 0;generator < length; generator++){

    //get index of next Array from includeChars
     let nextCharArrayIndex = generator % includeChars.length;
     let nextCharArrayLength = includeChars[nextCharArrayIndex].length;
     let nextRandomCharIndex = Math.floor(Math.random() * nextCharArrayLength)

     let nextRandomChar = includeChars[nextCharArrayIndex[nextRandomCharIndex]]

     let nextCharArray = includeChars[nextCharArrayIndex];
     let randomChar = nextCharArray[nextRandomCharIndex];

     generatedPassword.push(randomChar);


  }

      /* Randomize password  using Durstenfeld shuffle algorithm */
    function shufflePassword(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }



   shufflePassword(generatedPassword);

   generatedPassword = generatedPassword.join('');
   return res.send({generatedPassword:generatedPassword});


}












module.exports.suggestPassword = suggestPassword;

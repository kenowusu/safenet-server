let express = require('express');
let router = express.Router();
const {createPassword} = require('../lib/password/createPassword');
const {suggestPassword} = require('../lib/password/suggestPassword');
const {getPassword} = require('../lib/password/getPassword');
const {isAuthorized} = require('../lib/authentication/isAuthenticated');
const {getUrlPasswords} = require('../lib/password/getUrlPasswords');

/*Create Passwords*/

router.post('/create',createPassword,(req,res,next)=>{});



router.post('/suggestion',suggestPassword,(req,res,next)=>{});



//get password
router.get('/password/:passwordId',isAuthorized,getPassword,(req,res,next)=>{});


//get url passwords when on websites
router.get('/url',isAuthorized,getUrlPasswords,(req,res,next)=>{});
module.exports = router;

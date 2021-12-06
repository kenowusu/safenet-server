let express = require('express');
let router = express.Router();
const {createPassword} = require('../lib/password/createPassword');
const {suggestPassword} = require('../lib/password/suggestPassword');
const {getPassword} = require('../lib/password/getPassword');
const {isAuthorized} = require('../lib/authentication/isAuthorized');

/*Create Passwords*/

router.post('/create',createPassword,(req,res,next)=>{});



router.post('/suggestion',suggestPassword,(req,res,next)=>{});



//get password

router.get('/password/:passwordId',isAuthorized,getPassword,(req,res,next)=>{});

module.exports = router;

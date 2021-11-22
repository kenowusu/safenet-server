let express = require('express');
let router = express.Router();
const {createPassword} = require('../lib/password/password');
const {suggestPassword} = require('../lib/password/suggestPassword');

/*Create Passwords*/

router.post('/create',createPassword,(req,res,next)=>{});



router.post('/suggestion',suggestPassword,(req,res,next)=>{});



module.exports = router;

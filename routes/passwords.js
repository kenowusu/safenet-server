let express = require('express');
let router = express.Router();
const {createPassword} = require('../lib/password/password');


/*Create Passwords*/

router.post('/create',createPassword,(req,res,next)=>{});


module.exports = router;

var express = require('express');
var router = express.Router();
const {login} = require('../lib/authentication/login');
const {register}   = require('../lib/authentication/register');
import isLoggedIn from '../lib/authentication/isLoggedIn';


router.post('/login',login,(req,res,next)=>{})

router.post('/register',register,(req,res,next)=>{});

//check is Authenticated
router.post('/isLoggedIn',isLoggedIn,(req,res,next)=>{})

module.exports = router;

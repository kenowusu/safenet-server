let express = require('express');
let router = express.Router();
const {createPassword} = require('../lib/password/createPassword');
const {suggestPassword} = require('../lib/password/suggestPassword');
import getPasswords from '../lib/password/getPasswords';
const {getPassword} = require('../lib/password/getPassword');
import updatePassword from '../lib/password/updatePassword';
import deletePassword from '../lib/password/deletePassword';


const {isAuthorized} = require('../lib/authentication/isAuthenticated');
const {getUrlPasswords} = require('../lib/password/getUrlPasswords');

/*Create Passwords*/

router.post('/create',isAuthorized,createPassword,(req,res,next)=>{});



router.post('/suggestion',suggestPassword,(req,res,next)=>{});



//get passwords
router.get('/',isAuthorized,getPasswords,(req,res,next)=>{});


//get password
router.get('/password/:passwordId',isAuthorized,getPassword,(req,res,next)=>{});


//get password
router.put('/password/:passwordId',isAuthorized,updatePassword,(req,res,next)=>{});



//get password
router.delete('/password/:passwordId',isAuthorized,deletePassword,(req,res,next)=>{});

//get url passwords when on websites
router.get('/url',isAuthorized,getUrlPasswords,(req,res,next)=>{});
module.exports = router;

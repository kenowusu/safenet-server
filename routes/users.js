var express = require('express');
var router = express.Router();
const {authenticate} = require('../lib/authentication/authenticate');
const {register}   = require('../lib/authentication/register');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/login',authenticate,(req,res,next)=>{})

router.post('/register',register,(req,res,next)=>{})

module.exports = router;

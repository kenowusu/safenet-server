const express = require('express');
const router = express.Router();
const {createFolder} = require('../lib/folder/createFolder');




router.get('/',(req,res,next)=>{
  return res.send('Folder routes')
})




//create folder
router.post('/',createFolder,(req,res,next)=>{})

















module.exports = router;

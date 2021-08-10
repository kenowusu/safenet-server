const express = require('express');
const router = express.Router();
const {createFolder} = require('../lib/folder/folder')



router.get('/',(req,res,next)=>{
  return res.send('Folder routes')
})




//create folder
router.post('/',createFolder,(req,res,next)=>{})

















module.exports = router;

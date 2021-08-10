const express = require('express');
const router = express.Router();
const {createFolder} = require('../lib/folder/createFolder');
const {editFolder} = require('../lib/folder/editFolder');



router.get('/',(req,res,next)=>{
  return res.send('Folder routes')
})




//create folder
router.post('/',createFolder,(req,res,next)=>{})



//edit folder
router.put('/edit/:id',editFolder,(req,res,next)=>{})

















module.exports = router;

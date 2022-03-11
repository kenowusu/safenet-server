const express = require('express');
const router = express.Router();
const {createFolder} = require('../lib/folder/createFolder');
const {editFolder} = require('../lib/folder/editFolder');
import isAuthenticated from '../lib/authentication/isAuthenticated';
import getFolders from '../lib/folder/getFolders';

// get folders 
router.get('/',isAuthenticated,getFolders);




//create folder
router.post('/',isAuthenticated,createFolder,(req,res,next)=>{})



//edit folder
router.put('/edit/:id',isAuthenticated,editFolder,(req,res,next)=>{})



















module.exports = router;

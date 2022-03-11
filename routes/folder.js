const express = require('express');
const router = express.Router();
const {createFolder} = require('../lib/folder/createFolder');
const {editFolder} = require('../lib/folder/editFolder');
import isAuthenticated from '../lib/authentication/isAuthenticated';
import getFolders from '../lib/folder/getFolders';
import getFolder from '../lib/folder/getFolder'

// get folders 
router.get('/',isAuthenticated,getFolders);


//get folder 
router.get('/:folder_id',isAuthenticated,getFolder);


//create folder
router.post('/',isAuthenticated,createFolder)



//edit folder
router.put('/edit/:id',isAuthenticated,editFolder);



















module.exports = router;

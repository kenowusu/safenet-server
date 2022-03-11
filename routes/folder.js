const express = require('express');
const router = express.Router();
const {createFolder} = require('../lib/folder/createFolder');
const {editFolder} = require('../lib/folder/editFolder');
import isAuthenticated from '../lib/authentication/isAuthenticated';
import getFolders from '../lib/folder/getFolders';
import getFolder from '../lib/folder/getFolder';
import deleteFolder from '../lib/folder/deleteFolder';

// get folders 
router.get('/',isAuthenticated,getFolders);


//get folder 
router.get('/:folder_id',isAuthenticated,getFolder);


//delete folder 
router.delete('/:folder_id',isAuthenticated,deleteFolder);


//create folder
router.post('/',isAuthenticated,createFolder)



//edit / update  folder
router.put('/edit/:id',isAuthenticated,editFolder);



















module.exports = router;

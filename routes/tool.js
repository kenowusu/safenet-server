var express = require('express');
var router = express.Router();

const {isAuthorized}  = require('../lib/authentication/isAuthenticated');



import importPassword from '../lib/tools/importPassword';
import sharePassword from '../lib/tools/sharePassword';


import {upload} from '../lib/tools/importPassword';





//import passwords 
router.post('/import_password',isAuthorized,upload.single('password_import'),importPassword)



//share password via email
router.post('/share_password',isAuthorized,sharePassword)

module.exports = router;

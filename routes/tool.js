var express = require('express');
var router = express.Router();

import isAuthenticated  from '../lib/authentication/isAuthenticated';



import importPassword from '../lib/tools/importPassword';
import sharePassword from '../lib/tools/sharePassword';


import {upload} from '../lib/tools/importPassword';





//import passwords 
router.post('/import_password',isAuthenticated,upload.single('password_import'),importPassword)



//share password via email
router.post('/share_password',isAuthenticated,sharePassword)

module.exports = router;

var express = require('express');
var router = express.Router();

const {isAuthorized}  = require('../lib/authentication/isAuthenticated');



import importPassword from '../lib/tools/importPassword';


import {upload} from '../lib/tools/importPassword';





/* GET home page. */
router.post('/import_password',isAuthorized,upload.single('password_import'),importPassword)

module.exports = router;

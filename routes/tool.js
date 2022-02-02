var express = require('express');
var router = express.Router();
const multer = require('multer');

import importPassword from '../lib/tools/importPassword';


import {upload} from '../lib/tools/importPassword';





/* GET home page. */
router.post('/import_password',upload.single('password_import'),importPassword)

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/import_password', function(req, res, next) {
  return res.send('import passwords');
});

module.exports = router;

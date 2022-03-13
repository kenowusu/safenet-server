const express = require('express');
const router = express.Router();
import LoginGuest from '../lib/guest/LoginGuest';










//loginGuestUser

router.post('/login',LoginGuest);




module.exports = router;
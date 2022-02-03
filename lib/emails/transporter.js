const nodemailer = require('nodemailer');

const sharePasswordUser = process.env.SHARE_PASSWORD_USER;
const sharePasswordPass = process.env.SHARE_PASSWORD_PASS;
const sharePasswordHost = process.env.SHARE_pASSWORD_HOST;

let transporter = nodemailer.createTransport({
    host:sharePasswordHost,
    port:587, 
    secure:false,
    auth:{
        user:sharePasswordUser,
        pass:sharePasswordPass
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports.transporter = transporter;

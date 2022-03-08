const {Password} = require('../../database/models/password')
import isEmail from 'validator/lib/isEmail';
import getUserId from '../authentication/util/getUserId';
import decryptPassword from '../password/utils/decryptPassword';
const {User} = require('../../database/models/user');
const ash = require('express-async-handler');

const {transporter} = require('../emails/transporter');

const sharePassword = ash(async(req,res,next)=>{
    
    const receiveEmail = req.body.email;
    const passwordId = req.body.passwordId;
    const user_id = getUserId(req,res);

    
    
    //=========send error if passwordId is not defined==========
    if(!passwordId){
        res.status(400);
        return res.send({
            error:true,
            message:"Password not found"
        });
    }

    //===============send error if receipient email is not valid =========
    if(!isEmail(receiveEmail)){
        res.status(400);
        return res.send({
            error:true,
            message:"Enter valid email"
        });
    }

   //========find password details
   const findPassword = await Password.findOne({where:{id:passwordId,user_id:user_id}});

   if(!findPassword){
       res.status(400);
       return res.send({
           error:true,
           message:"Password not found"
        });
   }

   
   //==============find User
   const findUser = await User.findOne({where:{id:user_id}});
   if(!findUser){
       return res.send({error:true,message:"Error sharing password,try again"});
   }
   
   const {firstname,lastname,email} = findUser;
   const  {url,password} = findPassword;
   
   const decryptedPassword =  decryptPassword(password);
   //===============callback for sendMail============
   const sendMailInfo = (err,info)=>{
    if(err){
         //===========if email sending fails==============
        res.status(500);       
        return res.send({
            error:true,
            message:"Password cannot be shared at this time"
        });
    }else if(info){
      //=================if email, send user response//
       res.status(200);
       return res.send({
           success:true,
           message:"Password shared successfully"
       })
   }
}
   //share password via email;
   let sendMail =  transporter.sendMail({
       from: `"RottPass" ${email}`,
       to:receiveEmail,
       subject:"Password Share To Friend",
       html:`Password for <b>${url}</b> is <b>${decryptedPassword}</b> `
   },sendMailInfo);



});



export default sharePassword;
const {Password} = require('../../database/models/password')
import getUserId from '../authentication/util/getUserId';
import decryptPassword from '../password/utils/decryptPassword';
const {User} = require('../../database/models/user');
const ash = require('express-async-handler');

const {transporter} = require('../emails/transporter');

const sharePassword = ash(async(req,res,next)=>{

    const passwordId = req.body.passwordId;
    const user_id = getUserId(req,res);

    if(!passwordId){
        return res.send({error:true,message:"Password not found"})
    }

    
   const findPassword = await Password.findOne({where:{id:passwordId,user_id:user_id}});

   if(!findPassword){
       return res.send({error:true,message:"Password not found"});
   }

   
   //find User
   const findUser = await User.findOne({where:{id:user_id}});
   if(!findUser){
       return res.send({error:true,message:"Error sharing password,try again"});
   }
   
   const {firstname,lastname,email} = findUser;
   const  {url,password} = findPassword;
   
   const decryptedPassword = await decryptPassword(password);
   
   //share password via email;
   let info = await transporter.sendMail({
       from: '"Node Pass" <info@nonsia.com',
       to:"thewebrott@gmail.com,keninchrist4eva@gmail.com",
       subject:"Password Share To Friend",
       html:`Password for <b>${url}</b> is <b>${decryptedPassword}</b> `
   })

   console.log("Message sent: %s", info.messageId);

});



export default sharePassword;
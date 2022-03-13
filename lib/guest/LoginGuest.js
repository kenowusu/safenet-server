
const {v4: uuidv4} = require('uuid');
const ash =  require('express-async-handler');

const {User}  = require('../../database/models/user');
import insertGuestPassword from './insertGuestPassword';
import insertGuestFolder from './insertGuestFolder';
import generateUserToken from '../authentication/util/generateUserToken';


const LoginGuest = ash(async(req,res,next)=>{



   const guestUserId = uuidv4();
   const timeStamp = Date.now();
   const email  = `user-${timeStamp}@gmail.com`;
   const password = `pass-${timeStamp}`;
 
   //=========================create user==============================//
   const createUser = User.create({
       id:guestUserId,
       email:email,
       password:password,
       is_guest:true
   });

   //=============insert passwords after user is created===============//
   createUser.then(()=>{
   insertGuestPassword(guestUserId);
     

   //=============insert folders =========================//
    insertGuestFolder(guestUserId);
   //============generate token for user =========================//
   const token = generateUserToken(guestUserId);


   //==========send token response to user =======================//
   return res.send({
       success:true,
       token:token
   })
    
})//createUser














});

export default LoginGuest;
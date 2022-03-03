const {Password}  = require('../../database/models/password');
const ash = require('express-async-handler');

import getUserId from '../authentication/util/getUserId';





const deletePassword = ash(async(req,res,next)=>{
   
    const passwordId = req.params.passwordId;
    const userId = getUserId(req,res);


    
    //check if passwordId and userId is defined
    if(!passwordId ||  !userId){
        return res.status(400).send({error:true,message:"bad request,try again"})
    }
    
    const deletePassword = Password.destroy({where:{id:passwordId,user_id:userId}});

    deletePassword.then(isdeletedPassword=>{
        return res.send({success:true,message:"password was delete successfully"});
    })
    .catch(deleteError => {
       return next(deleteError);
    });

})


export default deletePassword;
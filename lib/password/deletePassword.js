const {Password}  = require('../../database/models/password');
const ash= require('express-async-handler');

import getUserId from '../authentication/util/getUserId';





const deletePassword = ash(async(req,res,next)=>{

    const {id} = req.body;
    const user_id = getUserId(req,res)



    if(!id ||  !user_id){
        return res.status(400).send({error:true,message:"bad request,try again"})
    }

    const deletePassword = Password.destroy({where:{id,user_id}});

    deletePassword.then(isdeletedPassword=>{
        return res.send({success:true,message:"password was delete successfully"});
    })
    .catch(deleteError => {
      console.log(deleteError)
      return  res.status(500).send({error:true,message:"error deleting password, try again"})
    });

})


export default deletePassword;
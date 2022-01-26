

const {Password}  = require('../../database/models/password');
const ash= require('express-async-handler');
const {parse} = require('tldts');

import getUserId from '../authentication/util/getUserId';

const updatePassword = ash( async(req,res)=>{

  const {id,folder_id,name,url,username,password} = req.body;


  const user_id = getUserId(req,res)

  if(!id || !folder_id || !name || !url || !username || !password || !user_id){
    return res.status(401).send({error:true,message:"Could not update password, try again"})
  }
  
  
  //get domain and subdomain
  const {domain,subdomain} = parse(url);



  const updatePassword = Password.update({
    name,
    url,
    username,
    domain,
    subdomain,
    password,
    folder_id
  },{where:{id,user_id}})

  updatePassword.then(updatedPassword=>{
    return res.send({success:true,message:"Updated password successfully"});
  })
  .catch((updateError)=>{
      
   return res.status(400).send({error:true,message:"password update failed, try agian"})


  })
 

})

export default updatePassword;


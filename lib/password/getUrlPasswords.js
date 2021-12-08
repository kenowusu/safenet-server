const ash = require('express-async-handler');
const {parse} = require('tldts');
const {Url} = require('../../database/models/url');
const {Password} = require('../../database/models/password');
const {getUserId} = require('../authentication/util/user');



const getUrlPasswords = ash(async(req,res,next)=>{
  const url = req.query.url;
  const userId = getUserId(req,res);

  //get domain and subdomain of request url
  const {domain,subdomain} = parse(url);


  //find if domain requires unique credentials in for subdomains
  const findUrl = await Url.findOne({where:{domain:domain,user_id:userId}});

  /*if domain is not found in url or is empty, or passwords does not requires subdomain to be unique
   search passwords by only domain of  a user
  */
  if(!findUrl || findUrl.length == 0  || !findUrl.isunique){
    const notUniquePasswords = await Password.findAll({where:{domain:domain,user_id:userId}});
    return res.send(notUniquePasswords);
  }
  /* if domain requires subdomain to be unique
     search passwords by domain and subdomain of user
  */
  else if (findUrl.isunique){

    const  uniquePasswords = await Password.findAll({where:{domain:domain,subdomain:subdomain,user_id:userId}})
    return res.send(uniquePasswords)
  }

  else{ return res.status(500).send({message: "Server Error"})}


});








module.exports.getUrlPasswords = getUrlPasswords;

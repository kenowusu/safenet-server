const ash = require('express-async-handler');
const {parse} = require('tldts');
const {Url} = require('../../database/models/url');
const {Password} = require('../../database/models/password');
const {getUserId} = require('../authentication/util/user');



const getUrlPasswords = ash(async(req,res,next)=>{
  const url = req.query.url;
  const userId = getUserId(req,res);
  /*
   Get components of domain
   get domain
   get subdomain
  */
  const {domain,subdomain} = parse(url);


  const findUrl = await Url.findOne({domain:domain,user_id:userId});
   if(findUrl.isunique){
     /*
     If requires unique url, search by passwords by
     current sub domain
     */
    const findAllPasswords = await Password.findAll({where:{subdomain:domain,subdomain:subdomain,user_id:userId}})
    console.log(findAllPasswords)
   }



  /*
  If does not require unique url,  search passwords by subdomain
  */



});


module.exports.getUrlPasswords = getUrlPasswords;

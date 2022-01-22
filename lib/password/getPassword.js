const {isAuthorized}  = require('../authentication/isAuthenticated');
const {Password}  = require('../../database/models/password');
const asyncHandler = require('express-async-handler');

const getPassword = asyncHandler(async(req,res,next)=>{
  //get a single Password

  //get Password
  let passwordId = req.params.passwordId;

   passwordId = "17a584c5-b4eb-4592-b763-b97b86aaef3d";


  let findPassword = await Password.findOne({where:{id:passwordId}})

  


 return res.send(findPassword);


});

module.exports.getPassword = getPassword;

import { query } from 'express';
import { getUrlPasswords } from './getUrlPasswords';


const {Password}  = require('../../database/models/password');
const asyncHandler = require('express-async-handler');



const getPasswords = asyncHandler(async(req,res,next)=>{

    const filter = req.query.filter;
    const sort   = req.query.sort;
    
    if(filter && filter === 'true'){
        
        if(sort){
            
            //sort password a to z;
            if(sort  == "a_z"){
              const findPasswords = await Password.findAll({order:[['name','ASC']]});
              return res.send(findPasswords);
            }
            //sort password z to a
            else if(sort === "z_a"){
                const findPasswords = await Password.findAll({order:[['name','DESC']]});
                return res.send(findPasswords);
            }
            else{
                 //send passwords when sort filter not defined
                const findPasswords = await Password.findAll();
                return res.send(findPasswords);
            }
        }else{
            //send passwords when sort filter not defined
            const findPasswords = await Password.findAll();
            return res.send(findPasswords);
        }
        
    }

    //find all passwords;
    else{
        const findPasswords = await Password.findAll({});
        return res.send(findPasswords);
    }
  
    

  




});

export default getPasswords;

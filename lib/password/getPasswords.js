import { query } from 'express';
import { getUrlPasswords } from './getUrlPasswords';
const { Op } = require('sequelize');
import getUserId from '../authentication/util/getUserId';
import decryptPassword from './utils/decryptPassword';


const {Password}  = require('../../database/models/password');
const {Folder}  = require('../../database/models/folder');
const asyncHandler = require('express-async-handler');



const getPasswords = asyncHandler(async(req,res,next)=>{
    const userId = getUserId(req,res);
   

    const search = req.query.search;

    //======if there is a search key====================
    if(search && search === 'true'){
        
        const searchValue = req.query.searchValue;

        const findPasswords = await Password.findAll({
            where:{
                user_id:userId,
                [Op.or]:{
                    name:{
                     [Op.like]:`%${searchValue}%`
                    },
                    username:{
                     [Op.like]:`%${searchValue}%`
                    }
                }
            },
            include:Folder
        });

        let decryptedPasswords = []
        findPasswords.forEach(foundPass=>{
            foundPass.password = decryptPassword(foundPass.password);
            decryptedPasswords.push(foundPass);
        })
        return res.send(findPasswords);
    


    }

    //find all passwords;
    else{
        const findPasswords = await Password.findAll({
            where:{user_id:userId},
            include:Folder
        });
        //==========decrypt encrypted account password before sending=========//
        let decryptedPasswords = []
        findPasswords.forEach(foundPass=>{
            foundPass.password = decryptPassword(foundPass.password);
            decryptedPasswords.push(foundPass)
        })
        return res.send(findPasswords);
    
    }
  
    

  




});

export default getPasswords;

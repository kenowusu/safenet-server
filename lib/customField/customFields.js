
const ash = require('express-async-handler');
const {Password} = require('../../database/models/password');
const {CustomField} = require('../../database/models/customfield');
const {v4: uuidv4} = require('uuid');


const customFields = ash(async(req,res,next)=>{

   const passwordId = req.params.passwordId;
   const action = req.query.action;

   //create new custom field for password
   const {name,value} = req.body;
   if(action === "add"){
     const customfield = {
       id:uuidv4(),
       name:name,
       value:value,
       password_id:passwordId
     }
    const addCustomField = await CustomField.create(customfield);
    return res.send(addCustomField);

   }
   //if action is add, add custom field
  /*Actions
    add
    update
    delete 


  */
});
//get password id


/*Creating custom fields
//get password id
//create custom field
//insert password id
//update password customfield customfield to true;
*/


//updating custom fields


module.exports.customFields = customFields;

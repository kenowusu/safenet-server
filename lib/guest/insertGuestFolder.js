const {Folder}  = require('../../database/models/folder');

const {v4: uuid} = require('uuid');


/*Parameters
**guestUserId  - guestUserId to be inserted into the folders user_id column
*/
const insertGuestFolder = (guestUserId)=>{



    const folders = [
        {id:uuid(),name:"entertainment",user_id:guestUserId,},
        {id:uuid(),name:"business",user_id:guestUserId},
        {id:uuid(),name:"social",user_id:guestUserId},
        {id:uuid(),name:"email",user_id:guestUserId}
    ]
  Folder.bulkCreate(folders);
}



export default insertGuestFolder;
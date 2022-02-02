const ash  = require('express-async-handler');
const multer = require('multer');
const path  = require('path');






const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,path.join(__dirname,'/../../uploads/passwordimports'));
    },
    filename:(req,file,cb)=>{
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

export const upload = multer({storage:storage});






const importPassword = ash(async(req,res,next)=>{


    // upload(req, res, function (err) {
    //     if (err instanceof multer.MulterError) {
    //       // A Multer error occurred when uploading.
    //     } else if (err) {
    //       console.log(err)
    //     }
    
    //     // Everything went fine.
    //   })
})










export default importPassword;
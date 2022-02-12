import { tokenIsValid } from "./util/token";


const isLoggedIn = (req,res,next)=>{
    const token = req.cookies;
    console.log(token)
    if(tokenIsValid(req,res)){
        return res.send({isAuthenticated:true})
    }else{
        return res.send({isAuthenticated:false})
    }
}

export default isLoggedIn;
import { tokenIsValid } from "./util/token";


const isLoggedIn = (req,res,next)=>{
    if(tokenIsValid(req,res)){
        return res.send({isAuthenticated:true})
    }else{
        return res.send({isAuthenticated:false})
    }
}

export default isLoggedIn;
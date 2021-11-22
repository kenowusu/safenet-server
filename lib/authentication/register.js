 const {User} = require('../../database/models/user');
 const {v4: uuidv4} = require('uuid');

const validator = require('validator')



//util fuctions

//check if object is isEmpty
const isEmptyObject = (obj)=>{
  return Object.keys(obj).length  === 0;
}

const register = (req,res,next)=>{
  let {firstname,lastname,email,password} = req.body;
  let validationError = {};


  firstname = (firstname)?firstname:"";
  lastname = (lastname)?lastname:"";


  firstname = validator.ltrim(firstname);
  firstname = validator.rtrim(firstname);

  lastname = validator.ltrim(lastname);
  lastname = validator.rtrim(lastname);


  // validate and sanitize email
  email = validator.ltrim(email);
  email = validator.rtrim(email);
  validationError = (!validator.isEmpty(email)) ? validationError : Object.assign(validationError,{emailIsEmpty:"Email must not be empty"});
  validationError = (validator.isEmail(email)) ? validationError : Object.assign(validationError,{emailIsNotValid:"Not a valid email"});


  //validate password
  validationError = (!validator.isEmpty(password)) ? validationError : Object.assign(validationError,{passwordIsEmpty:"Password must not be empty"});

  // if there is validation errors send errors
  if(!isEmptyObject(validationError)){
    return res.send(validationError);
  }


//check if user with that email already exists;
User.findOne({where:{email:email}})
.then((userExists)=>{
  if(userExists){return res.status(403).send({message:"User already exists"})}

  //create user if user with email does not exists
  else{
    // else create new User;
    let newUser = {
      id:uuidv4(),
      email:email,
      password:password,
      first_name:firstname,
      last_name:lastname
    }

   newUser = User.create(newUser);

   newUser.then((createNewUser)=>{
      res.send({
        "id": createNewUser.id,
        "email": createNewUser.email,
        "first_name": createNewUser.firstname,
        "last_name": createNewUser.lastname
      })
    })
    .catch(userCreateError=>{
      console.log(userCreateError)
    })
    next();
  }//else


}).catch(userFindError=>{console.log(userFindError)})//User.findOne

}
















module.exports.register  = register;

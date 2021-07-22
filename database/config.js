const {Sequelize} = require('sequelize');


const sequelize = new Sequelize(
  {
    dialect:"mysql",
    host:"localhost",
    username:"root",
    password:"",
    database:"company"
  }
);

sequelize.authenticate()
.then(()=>{
  console.log(`Database connected successfully`)
})
.catch((error)=>{
  console.error(`Error - Unable to connect to the database: ${error}`);
})


module.exports.connection = sequelize;

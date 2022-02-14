const {Sequelize} = require('sequelize');
const fs = require('fs');

const sequelize = new Sequelize(
  {
    dialect:"mysql",
    host:process.env.DB_HOST,
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
  }
);

sequelize.authenticate()
.then(()=>{
  if(process.env.NODE_ENV === "development"){
    console.log('database connected successfully');
 
  }else{
      //create log file in production
      let createDbLog = fs.createWriteStream('dbconlog.txt');
      createDbLog.once('open',fd=>{
      createDbLog.write(`${new Date(Date.now()).toUTCString()}\n`);
      createDbLog.write('Database connected successfully');
      })
  }
})
.catch((error)=>{
  if(process.env.NODE_ENV == "development"){
    console.error(`Error - Unable to connect to the database: ${error}`);
  }else{
     //create log file in production
     let createDbLog = fs.createWriteStream('dberrlog.txt');
     createDbLog.once('open',fd=>{
     createDbLog.write(`${new Date(Date.now()).toUTCString()}\n`);
     createDbLog.write(error.stack);
     })
  }
})




module.exports.connection = sequelize;

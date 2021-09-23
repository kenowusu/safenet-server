const {Sequelize} = require('sequelize');


const sequelize = new Sequelize(
  {
    dialect:"mysql",
    host:process.env.DB_HOST,
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DATABASE_NAME
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

const sequelize = require('../config').connection;
const {Password}  = require('./password');
const {DataTypes,Model} = require('sequelize');
const {Url} = require('./url');
const bcrypt = require('bcrypt');


class User extends Model{}

User.init(
  {

    id:{
      type:DataTypes.STRING,
      primaryKey:true,
      allowNull:false
    },
    first_name:{
      type:DataTypes.STRING,
      allowNull: true
    },
    last_name:{
      type:DataTypes.STRING,
      allowNull:true
    },
    email:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false
    }
  },
  {

    //model options
    sequelize,
    modelName:'user',
    timestamps:true,
    createdAt:'created_at',
    updatedAt:'updated_at'
  }
);


//User model hooks
User.addHook('beforeCreate',(user,options)=>{
   const saltRounds = 10;
   const userPassword = bcrypt.hashSync(user.password,saltRounds);
   user.password = userPassword;
})


//association
User.hasMany(Password,{foreignKey:'user_id',key:'id',allowNull:false,constraints:true})
// sequelize.sync({force:true})
User.hasMany(Url,{foreignKey:'user_id',key:'id',allowNull:false,constraints:true})





exports.User = User;

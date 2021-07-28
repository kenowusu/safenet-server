const sequelize = require('../config').connection;
const {Password}  = require('./password');
const {DataTypes,Model} = require('sequelize');
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
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false
    }
  },
  {

    //model options
    sequelize,
    modelName:'User',
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
User.hasMany(Password,{foreignKey:'user_id',key:'id'})
Password.belongsTo(User,{constraints:false,foreignKey:'user_id'});


exports.User = User;

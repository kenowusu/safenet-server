const sequelize = require('../config').connection;
const {Password}  = require('./password');
const {DataTypes,Model} = require('sequelize');



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
      allowNull:false
    },
    last_name:{
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





//association
User.hasMany(Password,{foreignKey:'user_id',key:'id'})
Password.belongsTo(User,{constraints:false});

exports.User = User;

sequelize.sync({force:true})

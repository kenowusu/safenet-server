const sequelize = require('../config').connection;

const {DataTypes,Model} = require('sequelize');
class User extends Model{

}

User.init(
  {
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


User.sync({
  force:true
})

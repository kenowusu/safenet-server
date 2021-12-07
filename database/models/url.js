const sequelize = require('../config').connection;
const {Password}  = require('./password');
const {DataTypes,Model} = require('sequelize');



class Url extends Model{}

Url.init(
  {

    id:{
      type:DataTypes.STRING,
      primaryKey:true,
      allowNull:false
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false
    },
    url:{
      type:DataTypes.STRING,
      allowNull:false
    },
    domain:{
      type:DataTypes.STRING,
      allowNull:false
    },
    subdomain:{
      type:DataTypes.STRING,
      allowNull:false
    },
    isunique:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    }
  },
  {

    //model options
    sequelize,
    modelName:'Url',
    timestamps:true,
    createdAt:'created_at',
    updatedAt:'updated_at'
  }
);








exports.Url = Url;

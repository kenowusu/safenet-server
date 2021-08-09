const sequelize = require('../config').connection;
const {Model,DataTypes} = require('sequelize');
const {CustomField}  =  require('./customfield');




class Password extends Model{}


Password.init(
  {
    id:{
      type:DataTypes.STRING,
      allowNull:false,
      primaryKey:true
    },
    name:{
      type:DataTypes.STRING,
      allowNull:true
      // name of the website
    },
    url:{
      type:DataTypes.STRING,
      allowNull:true
    },

    username:{
      type:DataTypes.STRING,
      allowNull:true

      // the username(email,username)
    },
    password:{
      type:DataTypes.STRING,
      allowNull:true
      // the password for authentication for the website
    },
    custom_field:{
      type:DataTypes.BOOLEAN,
      defaltValue:false
      //
    },
    notes:{
      type:DataTypes.TEXT,
      defaltValue:false
      // notes to describe the website
    }
  },
  {

    //model options
    sequelize,
    modelName:'Password',
    timestamps:true,
    createdAt:'created_at',
    updatedAt:'updated_at'
  }
);

//association


Password.hasMany(CustomField,{foreignKey:'password_id',key:'id'});
CustomField.belongsTo(Password,{constraints:false,foreignKey:'password_id'});

exports.Password = Password;

const {Model,DataTypes} = require('sequelize');
const sequelize = require('../config').connection;

class Note extends Model{}


Note.init(
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
    note:{
      type:DataTypes.TEXT,
      allowNull:false
    }
  },
  {

    sequelize,
    modelName:'note',
    timestamps:true,
    createdAt:'created_at',
    updatedAt:'updated_at'
  }
)






exports.Note = Note;

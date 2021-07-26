const sequelize = require('../config').connection;
const {Password}  = require('./password');
const {DataTypes,Model} = require('sequelize');



class Folder extends Model{}

Folder.init(
  {

    id:{
      type:DataTypes.STRING,
      primaryKey:true,
      allowNull:false
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false
    }
  },
  {

    //model options
    sequelize,
    modelName:'Folder',
    timestamps:true,
    createdAt:'created_at',
    updatedAt:'updated_at'
  }
);





//association
Folder.hasMany(Password,{foreignKey:'folder_id',key:'id'});
Password.belongsTo(Folder,{constraints:false,foreignKey:'folder_id'});

exports.Folder = Folder;

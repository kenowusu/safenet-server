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




// sequelize.sync({force:true})
// .catch(function(err){
//   console.log(err.message)
// })
//association
Folder.hasMany(Password,{foreignKey:'folder_id',key:'id',allowNull:true,constraints:false});
Password.belongsTo(Folder,{constraints:false,foreignKey:'folder_id',allowNull:true});


exports.Folder = Folder;

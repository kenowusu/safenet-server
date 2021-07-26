const sequelize = require('../config').connection;

const {DataTypes,Model} = require('sequelize');
class CustomField extends Model{

}

CustomField.init(
  {
    id:{
      type:DataTypes.STRING,
      allowNull:false,
      primaryKey:true
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false
      // Name of the field
    },
    value:{
      type:DataTypes.STRING,
      allowNull:false
      //value for the custom field
    }
  },
  {

    //model options
    sequelize,
    modelName:'custom_field',
    timestamps:true,
    createdAt:'created_at',
    updatedAt:'updated_at'
  }
);


CustomField.sync({
  force:true
})

exports.CustomField = CustomField;

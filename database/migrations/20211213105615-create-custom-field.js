'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('custom_fields', {
      id:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true
      },
      name:{
        type:Sequelize.STRING,
        allowNull:false
        // Name of the field
      },
      value:{
        type:Sequelize.STRING,
        allowNull:false
        //value for the custom field
      },
      password_id:{
        type:Sequelize.STRING,
        references:{
          model:"passwords",
          key:"id"
        }
      },
      created_at:{
        type:Sequelize.DATE,
        allowNull:false
      },
      updated_at:{
        type:Sequelize.DATE,
        allowNull:false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('custom_fields');
  }
};

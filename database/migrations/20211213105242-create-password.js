'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('passwords', {
      id:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true
      },
      name:{
        type:Sequelize.STRING,
        allowNull:true
        // name of the website
      },
      url:{
        type:Sequelize.STRING,
        allowNull:true
      },
      domain:{
        type:Sequelize.STRING,
        allowNull:true
      },

      subdomain:{
        type:Sequelize.STRING,
        allowNull:true
      },

      username:{
        type:Sequelize.STRING,
        allowNull:true

        // the username(email,username)
      },
      password:{
        type:Sequelize.STRING,
        allowNull:true
        // the password for authentication for the website
      },
      custom_field:{
        type:Sequelize.BOOLEAN,
        defaltValue:false
        //
      },
      notes:{
        type:Sequelize.TEXT,
        defaltValue:false
        // notes to describe the website
      },
      user_id:{
        type:Sequelize.STRING,
        references:{
          model:"users",
          key:"id"
        }
      },
      folder_id:{
        type:Sequelize.STRING
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
    await queryInterface.dropTable('passwords');
  }
};

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('urls', {

          id:{
            type:Sequelize.STRING,
            primaryKey:true,
            allowNull:false
          },
          name:{
            type:Sequelize.STRING,
            allowNull:false
          },
          url:{
            type:Sequelize.STRING,
            allowNull:false
          },
          domain:{
            type:Sequelize.STRING,
            allowNull:false
          },
          subdomain:{
            type:Sequelize.STRING,
            allowNull:false
          },
          isunique:{
            type:Sequelize.BOOLEAN,
            defaultValue:false
          },
          user_id:{
            type:Sequelize.STRING,
            references:{
              model:"users",
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
    await queryInterface.dropTable('urls');
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    return queryInterface.changeColumn('folders','user_id',{
      type:Sequelize.STRING,
      allowNull:false
    })
  },

  down: async (queryInterface, Sequelize) => {
   
    return queryInterface.changeColumn('folders','user_id',{
      type:Sequelize.STRING,
      allowNull:true
    })
  }
};

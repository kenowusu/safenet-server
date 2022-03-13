'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
   return queryInterface.addColumn('users','is_guest',{
      type:Sequelize.BOOLEAN,
      defaultValue:0
    })
  },

  down: async (queryInterface, Sequelize) => {
   
  return  queryInterface.removeColumn('users','is_guest');
  }
};

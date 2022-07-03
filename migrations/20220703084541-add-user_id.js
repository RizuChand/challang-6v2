'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */



    await queryInterface.addColumn('user_game_biodata', 'user_id', {type: Sequelize.INTEGER, references: {
      model: {
        tableName: 'user_games'
      },
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE' })
    await queryInterface.addColumn('user_game_histories', 'user_id', {type: Sequelize.INTEGER, references: {
      model: {
        tableName: 'user_games'
      },
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'})


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeColumn('user_game_biodata', 'user_id', {type: Sequelize.INTEGER })
     await queryInterface.removeColumn('user_game_history', 'user_id', {type: Sequelize.INTEGER })
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tasksAllotments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.BIGINT,
        defaultValue: () => Date.now()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.BIGINT,
        defaultValue: () => Date.now()
      },
      uniqueId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      taskId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      comment:{
        type: Sequelize.TEXT('medium'),
        allowNull: true,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tasksAllotments');
  },
};

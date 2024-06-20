'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('rolesAndPrivileges', {
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
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      addUser: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      removeUser: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      addTask: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      removeTask: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      addOrg: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      removeOrg: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
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
    return queryInterface.dropTable('rolesAndPrivileges');
  },
};

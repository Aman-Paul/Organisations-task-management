'use strict';
const uuid = require('uuid');

const { USER_ROLES } = require('../../config/appConstants.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('rolesAndPrivileges', [{
      createdAt: Date.now(),
      updatedAt: Date.now(),
      uniqueId: uuid.v4(),
      name: USER_ROLES.OWNER,
      addUser: true,
      removeUser: true,
      addTask: true,
      removeTask: true,
      addOrg: true,
      removeOrg: true,
      isActive: true
    }, {
      createdAt: Date.now(),
      updatedAt: Date.now(),
      uniqueId: uuid.v4(),
      name: USER_ROLES.ADMIN,
      addUser: true,
      removeUser: true,
      addTask: true,
      removeTask: true,
      addOrg: true,
      removeOrg: false,
      isActive: true
    },
    {
      createdAt: Date.now(),
      updatedAt: Date.now(),
      uniqueId: uuid.v4(),
      name: USER_ROLES.MEMBER,
      addUser: true,
      removeUser: true,
      addTask: true,
      removeTask: true,
      addOrg: false,
      removeOrg: false,
      isActive: true
    },
    {
      createdAt: Date.now(),
      updatedAt: Date.now(),
      uniqueId: uuid.v4(),
      name: USER_ROLES.USER,
      addUser: false,
      removeUser: false,
      addTask: false,
      removeTask: false,
      addOrg: false,
      removeOrg: false,
      isActive: true
    }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('rolesAndPrivileges', null, {});
  }
};

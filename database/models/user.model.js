'use strict';
const { DataTypes } = require("sequelize");
const BaseModel = require('./base.model');
const sequelize = require("../connection");

class User extends BaseModel {}

User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  orgId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users'
});

sequelize.sync().then(() => {
  console.log('User table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

module.exports = User;

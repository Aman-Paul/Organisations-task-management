'use strict';
const { DataTypes } = require("sequelize");
const BaseModel = require('./base.model');
const sequelize = require("../connection");

class Org extends BaseModel {}

Org.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Org',
  tableName: 'organisations'
});

sequelize.sync().then(() => {
  console.log('Org created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

module.exports = Org;

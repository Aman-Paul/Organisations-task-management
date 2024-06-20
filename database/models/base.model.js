'use strict';
const { Model, DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require('../connection');

class BaseModel extends Model {
  static init(attributes, options) {
    super.init({
      createdAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: () => Date.now()
      },
      updatedAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: () => Date.now()
      },
      uniqueId: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: UUIDV4
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true
      },
      ...attributes
    }, {
      ...options,
      sequelize,
    });
  }
}

module.exports = BaseModel;

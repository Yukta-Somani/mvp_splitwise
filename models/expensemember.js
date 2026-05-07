'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExpenseMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ExpenseMember.init({
    expenseId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    share: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'ExpenseMember',
  });
  return ExpenseMember;
};
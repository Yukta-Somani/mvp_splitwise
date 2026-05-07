'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ExpenseMembers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
ExpenseId: {
  type: Sequelize.INTEGER,
  references: { model: "Expenses", key: "id" },
  onUpdate: "CASCADE",
  onDelete: "CASCADE"
},
userId: {
  type: Sequelize.INTEGER,
  references: { model: "UserData", key: "id" },
  onUpdate: "CASCADE",
  onDelete: "CASCADE"
},
      share: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ExpenseMembers');
  }
};
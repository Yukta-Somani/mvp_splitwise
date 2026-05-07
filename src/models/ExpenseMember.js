import { Model, DataTypes } from "sequelize";

class ExpenseMember extends Model {
  static init(sequelize) {
    super.init(
      {
        share: { type: DataTypes.DECIMAL(10,2), allowNull: true }
      },
      { sequelize, modelName: "ExpenseMember", timestamps: true }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "userId" });
    this.belongsTo(models.Expense, { foreignKey: "expenseId" });
  }
}

export default ExpenseMember;

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
  this.belongsTo(models.UserData, { foreignKey: "userId" });       // member belongs to a user
  this.belongsTo(models.Expense, { foreignKey: "ExpenseId" });     // member belongs to an expense
}

}

export default ExpenseMember;

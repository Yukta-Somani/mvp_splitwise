import { Model, DataTypes } from "sequelize";

class Expense extends Model {
  static init(sequelize) {
    super.init(
      {
        name: { type: DataTypes.STRING, allowNull: false },
        value: { type: DataTypes.DECIMAL(10,2), allowNull: false },
        currency: { type: DataTypes.STRING, allowNull: false },
        date: { type: DataTypes.DATE, allowNull: false }
      },
      { sequelize, modelName: "Expense", timestamps: true }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "createdBy" });
    this.belongsToMany(models.User, { through: models.ExpenseMember });
  }
}

export default Expense;

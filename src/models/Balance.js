import { Model, DataTypes } from "sequelize";

class Balance extends Model {
  static init(sequelize) {
    super.init(
      {
        balance: { type: DataTypes.DECIMAL(10,2), allowNull: false }
      },
      { sequelize, modelName: "Balance", timestamps: true }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "userId" });
    this.belongsTo(models.User, { foreignKey: "otherUserId", as: "OtherUser" });
  }
}

export default Balance;

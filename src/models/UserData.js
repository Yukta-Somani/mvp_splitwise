import { Model, DataTypes } from "sequelize";

class UserData extends Model {
  static init(sequelize) {
    super.init(
      {
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        currency: { type: DataTypes.STRING, allowNull: false }
      },
      { sequelize, modelName: "UserData", timestamps: true }
    );
    return this;
  }

  static associate(models) {
  this.hasMany(models.Expense, { foreignKey: "createdBy" }); 
  this.hasMany(models.ExpenseMember, { foreignKey: "userId" });    // user can be in many expenses
}

}

export default UserData;

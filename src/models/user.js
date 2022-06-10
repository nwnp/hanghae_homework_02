const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        nickname: {
          type: Sequelize.STRING(100),
          allowNull: false,
          required: true,
        },
        email: {
          type: Sequelize.STRING(100),
          allowNull: false,
          required: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: true,
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Post, { foreignKey: "userId", sourceKey: "id" });
    db.User.hasMany(db.Like, { foreignKey: "userId", sourceKey: "id" });
  }
};

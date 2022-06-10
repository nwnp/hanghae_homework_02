const Sequelize = require("sequelize");

module.exports = class Like extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {},
      {
        sequelize,
        timestamps: false,
        paranoid: false,
        modelName: "Like",
        tableName: "likes",
      }
    );
  }
  static associate(db) {
    db.Like.belongsTo(db.Post, { foreignKey: "postId", targetKey: "id" });
    db.Like.belongsTo(db.User, { foreignKey: "userId", targetKey: "id" });
  }
};

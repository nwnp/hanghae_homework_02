const Sequelize = require("sequelize");

module.exports = class Image extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        imageUrl: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        paranoid: false,
        modelName: "Image",
        tableName: "images",
      }
    );
  }
  static associate(db) {
    db.Image.belongsTo(db.Post, { foreignKey: "postId", sourceKey: "id" });
  }
};

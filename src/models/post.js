const Sequelize = require("sequelize");

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(100),
          allowNull: false,
          required: true,
        },
        content: {
          type: Sequelize.STRING(1000),
          allowNull: false,
          required: true,
        },
        image: {
          type: Sequelize.STRING(),
          allowNull: true,
        },
        imageKey: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        paranoid: true,
        modelName: "Post",
        tableName: "posts",
      }
    );
  }
  static associate(db) {
    db.Post.belongsTo(db.User, { foreignKey: "userId", targetKey: "id" });
    db.Post.hasMany(db.Like, { foreignKey: "postId", sourceKey: "id" });
    db.Post.hasMany(db.Image, { foreignKey: "postId", sourceKey: "id" });
  }
};

const postCategoryModel = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    {
      postId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      categoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
      }
    },
    {
      underscored: true,
      tableName: 'posts_categories',
      timestamps: false,
    },
    );

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category,{
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'post',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostCategory;
};

module.exports = postCategoryModel;

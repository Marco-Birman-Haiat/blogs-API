const postCategoryModel = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    {},
    {
      underscored: true,
      tableName: 'posts_categories',
    },
    );

  PostCategory.associate = (models) => {
    models.Post.belogsToMany(models.Post,{
      as: 'posts',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Category.belogsToMany(models.Category,{
      as: 'categories',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  (async () => {
    await sequelize.sync({ force: true });
    // As funções vão aqui
  })();

  return PostCategory;
};

module.exports = postCategoryModel;

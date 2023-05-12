// src/models/user.model.js

const CategoriesModel = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    tableName: 'categories'
  });

  (async () => {
    await sequelize.sync({ force: true });
    // As funções vão aqui
  })();

  return Category;
};

module.exports = CategoriesModel;

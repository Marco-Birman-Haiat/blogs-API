// src/models/user.model.js

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    underscored: true,
  });

  User.associate = (models) => {
    User.hasMany(models.BlogPost, 
      { foreignKey: true, as: 'blog_posts'});
  };

  return User;
};
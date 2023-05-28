// src/models/user.model.js

// class userModel {
//   static associate(models) {
//     User.hasMany(models.BlogPost, { foreignKey: true, as: 'blog_posts' });    
//   }

//   constructor(sequelize, DataTypes) {
//     return sequelize.define(
//       'User',
//       {
//         id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//         displayName: DataTypes.STRING,
//         email: DataTypes.STRING,
//         password: DataTypes.STRING,
//         image: DataTypes.STRING,
//       },
//       {
//         underscored: true,
//         timestamps: false,
//       }
//     );
//   }
// }

const userModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      underscored: true,
      timestamps: false,
    }
  );

  User.associate = (models) => {
    User.hasMany(models.BlogPost, { foreignKey: true, as: 'blog_posts' });
  };

  return User;
};

module.exports = userModel;
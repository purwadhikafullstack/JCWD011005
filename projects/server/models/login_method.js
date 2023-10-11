module.exports = (sequelize, DataTypes) => {
  const LoginMethod = sequelize.define('LoginMethod', {
    login_method_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING(255),
  },
  {
    tableName: 'login_methods'
  }, {});

  LoginMethod.associate = (models) => {
    LoginMethod.hasOne(models.User, { foreignKey: 'user_id' });
  };

  return LoginMethod;
};

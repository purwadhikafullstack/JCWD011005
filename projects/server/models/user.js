module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: DataTypes.STRING(60),
    first_name: DataTypes.STRING(255),
    last_name: DataTypes.STRING(255),
    phone: DataTypes.STRING(15),
    gender: DataTypes.STRING(10),
    birthdate: DataTypes.DATE,
    image_profile: DataTypes.STRING(255),
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    google: DataTypes.STRING(255),
    login_method_id: DataTypes.INTEGER,
    otp: DataTypes.INTEGER,
    otp_sent_a_day: DataTypes.INTEGER,
    otp_last_sent: DataTypes.DATE
  }, {});

  User.associate = (models) => {
    //User.belongsTo(models.LoginMethod, { foreignKey: 'login_method_id' });
    User.hasMany(models.Transaction, { foreignKey: 'user_id' });
    User.hasMany(models.Review, { foreignKey: 'user_id' });
  };

  return User;
};

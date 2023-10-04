module.exports = (sequelize, DataTypes) => {
  const Promotion = sequelize.define('Promotion', {
    promotion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: DataTypes.STRING,
    image_path: DataTypes.STRING,
  }, {});

  return Promotion;
};

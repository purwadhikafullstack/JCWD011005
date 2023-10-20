module.exports = (sequelize, DataTypes) => {
  const ReviewImage = sequelize.define('ReviewImage', {
    review_image_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    path: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    review_id: DataTypes.INTEGER,
  },
  {
    tableName: 'review_images'
  }, {});

  ReviewImage.associate = (models) => {
    ReviewImage.belongsTo(models.Review, { foreignKey: 'review_id' });
  };

  return ReviewImage;
};

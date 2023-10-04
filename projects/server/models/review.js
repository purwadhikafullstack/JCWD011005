module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    review_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    rating: DataTypes.INTEGER,
    description: DataTypes.STRING,
    room_id: DataTypes.INTEGER,
    transaction_id: DataTypes.INTEGER,
  }, {});

  Review.associate = (models) => {
    Review.belongsTo(models.Room, { foreignKey: 'room_id' });
    Review.belongsTo(models.Transaction, { foreignKey: 'transaction_id' });
    Review.belongsTo(models.User, { foreignKey: 'user_id' });
    Review.hasMany(models.ReviewImage, { foreignKey: 'review_id' });
  };

  return Review;
};

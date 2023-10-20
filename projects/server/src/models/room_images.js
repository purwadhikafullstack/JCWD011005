module.exports = (sequelize, DataTypes) => {
  const RoomImages = sequelize.define('RoomImages', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    path: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    room_id: DataTypes.INTEGER,
  },
  {
    tableName: 'room_images'
  }, {});

  RoomImages.associate = (models) => {
    RoomImages.belongsTo(models.Room, { foreignKey: 'room_id' });
  };

  return RoomImages;
};

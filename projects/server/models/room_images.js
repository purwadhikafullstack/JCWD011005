module.exports = (sequelize, DataTypes) => {
  const RoomImage = sequelize.define('RoomImage', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    path: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    room_id: DataTypes.INTEGER,
  },
  {
    tableName: 'room_images'
  }, {});

  RoomImage.associate = (models) => {
    RoomImage.belongsTo(models.Room, { foreignKey: 'room_id' });
  };

  return RoomImage;
};

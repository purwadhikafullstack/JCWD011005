module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    type: DataTypes.STRING(255),
    description: DataTypes.STRING,
    max_guest: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    base_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    property_id: DataTypes.INTEGER,
  }, {});

  Room.associate = (models) => {
    Room.belongsTo(models.Property, { foreignKey: 'property_id' });
    Room.hasMany(models.RoomImages, { foreignKey: 'room_id' });
    Room.hasMany(models.RoomEvents, { foreignKey: 'room_id' });
    Room.hasMany(models.TransactionItem, { foreignKey: 'room_id' });
    Room.hasMany(models.Review, { foreignKey: 'room_id' });
  };

  return Room;
};

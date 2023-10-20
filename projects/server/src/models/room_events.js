module.exports = (sequelize, DataTypes) => {
  const RoomEvents = sequelize.define('RoomEvents', {
    room_event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING(255),
    is_percentage: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    value: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'room_events'
  }, {});

  RoomEvents.associate = (models) => {
    RoomEvents.belongsTo(models.Room, { foreignKey: 'room_id' });
  };

  return RoomEvents;
};

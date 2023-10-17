module.exports = (sequelize, DataTypes) => {
  const RoomEvent = sequelize.define('RoomEvent', {
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
      type: DataTypes.INTEGER,
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

  RoomEvent.associate = (models) => {
    RoomEvent.belongsTo(models.Room, { foreignKey: 'room_id' });
  };

  return RoomEvent;
};

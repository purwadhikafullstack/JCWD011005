module.exports = (sequelize, DataTypes) => {
  const TransactionItem = sequelize.define('TransactionItem', {
    transaction_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    date: DataTypes.DATE,
    transaction_id: DataTypes.INTEGER,
    room_event_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER,
  },
  {
    tableName: 'transaction_items'
  }, {});

  TransactionItem.associate = (models) => {
    TransactionItem.belongsTo(models.Room, { foreignKey: 'room_id' });
    TransactionItem.belongsTo(models.Transaction, { foreignKey: 'transaction_id' });
    TransactionItem.belongsTo(models.RoomEvent, { foreignKey: 'room_event_id' });
  };

  return TransactionItem;
};

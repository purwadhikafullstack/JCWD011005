module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    room_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    total_price: DataTypes.DECIMAL(10, 2),
    transfer_receipt: DataTypes.STRING(255),
    status_id: DataTypes.INTEGER,
    is_reviewed: DataTypes.BOOLEAN
  }, {});

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.Room, { foreignKey: 'room_id' });
    Transaction.belongsTo(models.User, { foreignKey: 'user_id' });
    Transaction.belongsTo(models.Status, { foreignKey: 'status_id' });
    Transaction.hasMany(models.TransactionItem, { foreignKey: 'transaction_id' });
    Transaction.hasMany(models.Review, { foreignKey: 'transaction_id' });
  };

  return Transaction;
};

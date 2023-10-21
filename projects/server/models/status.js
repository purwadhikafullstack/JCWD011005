module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    }
  }, {});

  return Status;
};

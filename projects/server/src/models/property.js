module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define('Property', {
    property_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: DataTypes.STRING,
    address: DataTypes.STRING,
    property_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tenant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});

  Property.associate = (models) => {
    Property.belongsTo(models.PropertyCategory, { foreignKey: 'property_category_id' });
    Property.belongsTo(models.Tenant, { foreignKey: 'tenant_id' });
    Property.hasMany(models.Room, { foreignKey: 'property_id' });
    Property.hasMany(models.PropertyImage, { foreignKey: 'property_id' });
  };

  return Property;
};

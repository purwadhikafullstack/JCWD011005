module.exports = (sequelize, DataTypes) => {
  const PropertyImage = sequelize.define('PropertyImage', {
    property_image_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    path: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    property_id: DataTypes.INTEGER,
  },
  {
    tableName: 'property_images'
  }, {});

  PropertyImage.associate = (models) => {
    PropertyImage.belongsTo(models.Property, { foreignKey: 'property_id' });
  };

  return PropertyImage;
};

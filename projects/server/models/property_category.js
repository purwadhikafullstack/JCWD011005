module.exports = (sequelize, DataTypes) => {
  const PropertyCategory = sequelize.define('PropertyCategory', {
    property_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    }
  },
  {
    tableName: 'property_categories'
  }, {});

  return PropertyCategory;
};

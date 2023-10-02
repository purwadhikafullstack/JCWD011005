module.exports = (sequelize, DataTypes) => {
    const PropertyCategory = sequelize.define('property_categories', {
      property_category_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
    }, {
      createdAt: false,
      timestamps: false,
      updatedAt: false
    });

    return PropertyCategory;
}
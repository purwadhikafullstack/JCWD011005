module.exports = (sequelize, DataTypes) => {
    const PropertyCategory = sequelize.define('property_category', {
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

// const { Model } = require('sequelize')
// module.exports = (sequelize, DataTypes) => {
// class PropertyCategory extends Model {}
//   PropertyCategory.init(
//   {
//       property_category_id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: DataTypes.INTEGER
//       },
//       name: {
//         allowNull: false,
//         type: DataTypes.STRING
//       },
//     }, {
//       // createdAt: false,
//       // timestamps: false,
//       // updatedAt: false
//       sequelize, modelName: 'property_category'
//     });
//     return PropertyCategory
// }
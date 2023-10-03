const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
//     const PropertyCategory = sequelize.define('property_category', {
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
//       createdAt: false,
//       timestamps: false,
//       updatedAt: false
//     });

//     return PropertyCategory;
class PropertyCategory extends Model {}
  PropertyCategory.init(
  {
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
      // createdAt: false,
      // timestamps: false,
      // updatedAt: false
      sequelize, modelName: 'property_category'
    });
    return PropertyCategory
}

// 'use strict'
// const { Model } = require('sequelize')
// module.exports = (sequelize, DataTypes) => {
//   class Cart_Item extends Model {
//     static associate(models) {
//       this.belongsTo(models.Product, { foreignKey: 'productId' })
//       this.belongsTo(models.Cart, { foreignKey: 'cartId' })
//     }
//   }

//   Cart_Item.init(
//     {
//       cartId: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//       },
//       productId: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//       },
//       qu
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import Vendor from './Vendor.js';
import Category from './Category.js';

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  vendor_id: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.FLOAT, allowNull: false },
  status: { type: DataTypes.ENUM('pending', 'approved', 'rejected'), defaultValue: 'pending' },
  category_id: { type: DataTypes.INTEGER },
}, { tableName: 'products', timestamps: true });

Vendor.hasMany(Product, { foreignKey: 'vendor_id' });
Product.belongsTo(Vendor, { foreignKey: 'vendor_id' });

Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

export default Product;

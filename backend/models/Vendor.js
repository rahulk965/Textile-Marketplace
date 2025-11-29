import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Vendor = sequelize.define('Vendor', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  business_name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password_hash: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING },
  status: { type: DataTypes.ENUM('active', 'suspended'), defaultValue: 'active' },
}, { tableName: 'vendors', timestamps: true });

export default Vendor;

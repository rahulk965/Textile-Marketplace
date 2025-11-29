import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Admin = sequelize.define('Admin', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING },
  password_hash: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('admin', 'superadmin'), defaultValue: 'admin' },
}, { tableName: 'admin_users', timestamps: true });

export default Admin;

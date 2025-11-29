import dotenv from 'dotenv';
import path from 'path';
import { sequelize } from '../config/database.js';
import Admin from '../models/Admin.js';
import Vendor from '../models/Vendor.js';
import Category from '../models/Category.js';
import bcrypt from 'bcryptjs';

dotenv.config({ path: path.resolve(process.cwd(), 'backend/.env') });

async function run() {
  try {
    console.log('Authenticating database...');
    await sequelize.authenticate();
    console.log('✓ Connected');
    
    console.log('Syncing models...');
    await sequelize.sync({ alter: true });
    console.log('✓ Models synced');

    const adminCount = await Admin.count();
    if (adminCount === 0) {
      const hash = await bcrypt.hash('admin123', 10);
      await Admin.create({ username: 'admin', email: 'admin@example.com', password_hash: hash, role: 'superadmin' });
      console.log('✓ Created admin: admin / admin123');
    }

    const vendorCount = await Vendor.count();
    if (vendorCount === 0) {
      const hash = await bcrypt.hash('vendor123', 10);
      await Vendor.create({ 
        business_name: 'Test Vendor',
        email: 'vendor@test.com',
        password_hash: hash,
        phone: '1234567890',
        status: 'active'
      });
      console.log('✓ Created vendor: vendor@test.com / vendor123');
    }

    const defaults = ['Saree', 'Silk', 'Cotton', 'Designer'];
    for (const name of defaults) {
      await Category.findOrCreate({ where: { name }, defaults: { description: `${name} category` } });
    }

    console.log('\n✅ Database initialized successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ initDB failed:', err);
    process.exit(1);
  }
}

run();

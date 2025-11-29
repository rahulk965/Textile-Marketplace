import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { sequelize } from './config/database.js';
import authRoutes from './routes/auth.js';
import vendorRoutes from './routes/vendors.js';
import productRoutes from './routes/products.js';
import adminRoutes from './routes/admin.js';
import categoriesRoutes from './routes/categories.js';
import uploadRoutes from './routes/upload.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables from .env in backend directory
const envPath = path.resolve(__dirname, '.env');
console.log('📁 Loading .env from:', envPath);
dotenv.config({ path: envPath });

// Verify JWT_SECRET is loaded
if (!process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET not found in environment variables!');
  process.exit(1);
}
console.log('✓ JWT_SECRET loaded');

const app = express();
const PORT = process.env.PORT || 5000;
const UPLOAD_DIR = path.resolve(__dirname, process.env.UPLOAD_DIR || 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Security & parsing
app.use(helmet());
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({ windowMs: 60 * 1000, max: 300 });
app.use(limiter);

// Static
app.use('/uploads', express.static(UPLOAD_DIR));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/upload', uploadRoutes);

// Error handler
app.use(errorHandler);

// DB connect and start
async function start() {
  try {
    console.log('🔄 Connecting to database...');
    await sequelize.authenticate();
    console.log('✓ Database connected');
    
    console.log('🔄 Syncing models...');
    await sequelize.sync();
    console.log('✓ Models synced');
    
    app.listen(PORT, () => {
      console.log(`✅ Backend running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start backend:', err.message);
    process.exit(1);
  }
}

start();

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Vendor from '../models/Vendor.js';
import Admin from '../models/Admin.js';

export const registerVendor = async (req, res, next) => {
  try {
    const { business_name, email, password, phone } = req.body;
    if (!business_name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    const exists = await Vendor.findOne({ where: { email } });
    if (exists) return res.status(409).json({ message: 'Email already registered' });
    const hash = await bcrypt.hash(password, 10);
    const vendor = await Vendor.create({ business_name, email, password_hash: hash, phone });
    res.status(201).json({ id: vendor.id });
  } catch (err) { next(err); }
};

export const loginVendor = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    console.log('🔐 Vendor login attempt:', email);
    
    const vendor = await Vendor.findOne({ where: { email } });
    if (!vendor) {
      console.log('❌ Vendor not found:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const ok = await bcrypt.compare(password, vendor.password_hash);
    if (!ok) {
      console.log('❌ Password mismatch for:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: vendor.id, role: 'vendor' }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );
    console.log('✓ Vendor authenticated:', email);
    res.json({ token, user: { id: vendor.id, email: vendor.email } });
  } catch (err) { 
    console.error('❌ Vendor login error:', err.message);
    next(err); 
  }
};

export const loginAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // allow login by username or email
    const admin = await Admin.findOne({ where: { username } })
      || await Admin.findOne({ where: { email: username } });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, admin.password_hash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: admin.id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: admin.id, username: admin.username, email: admin.email } });
  } catch (err) { next(err); }
};

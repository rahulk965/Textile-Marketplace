import Product from '../models/Product.js';
import ProductImage from '../models/ProductImage.js';
import Category from '../models/Category.js';

export const createProduct = async (req, res, next) => {
  try {
    const { title, description, price, category_id } = req.body;
    if (!title || !price) return res.status(400).json({ message: 'Missing fields' });
    const product = await Product.create({ vendor_id: req.user.id, title, description, price, category_id });
    if (req.files && req.files.length) {
      const imgs = req.files.map(f => ({ product_id: product.id, image_url: `/uploads/${f.filename}`, is_primary: false }));
      await ProductImage.bulkCreate(imgs);
    }
    res.status(201).json(product);
  } catch (err) { next(err); }
};

export const listVendorProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({ where: { vendor_id: req.user.id }, include: [ProductImage, Category] });
    res.json(products);
  } catch (err) { next(err); }
};

export const listProductsAdmin = async (req, res, next) => {
  try {
    const { vendor_id, category_id, status, min_price, max_price, from_date, to_date } = req.query;
    const where = {};
    if (vendor_id) where.vendor_id = vendor_id;
    if (category_id) where.category_id = category_id;
    if (status) where.status = status;
    if (min_price) where.price = { ...(where.price || {}), gte: Number(min_price) };
    if (max_price) where.price = { ...(where.price || {}), lte: Number(max_price) };
    if (from_date || to_date) where.createdAt = { ...(where.createdAt || {}), ...(from_date ? { gte: new Date(from_date) } : {}), ...(to_date ? { lte: new Date(to_date) } : {}) };
    const products = await Product.findAll({ where, include: [ProductImage, Category] });
    res.json(products);
  } catch (err) { next(err); }
};

export const updateStatusAdmin = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed = ['pending', 'approved', 'rejected'];
    if (!allowed.includes(status)) return res.status(400).json({ message: 'Invalid status' });
    await Product.update({ status }, { where: { id: req.params.id } });
    res.json({ message: 'Status updated' });
  } catch (err) { next(err); }
};

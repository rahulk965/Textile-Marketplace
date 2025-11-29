import Vendor from '../models/Vendor.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

export const listVendors = async (req, res, next) => {
  try {
    const vendors = await Vendor.findAll();
    res.json(vendors);
  } catch (err) { next(err); }
};

export const updateVendorStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    await Vendor.update({ status }, { where: { id: req.params.id } });
    res.json({ message: 'Vendor status updated' });
  } catch (err) { next(err); }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const cat = await Category.create({ name, description });
    res.status(201).json(cat);
  } catch (err) { next(err); }
};

export const listCategories = async (req, res, next) => {
  try {
    const cats = await Category.findAll();
    res.json(cats);
  } catch (err) { next(err); }
};

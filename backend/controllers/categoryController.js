import Category from '../models/Category.js';

export const listPublicCategories = async (req, res, next) => {
  try {
    const cats = await Category.findAll();
    res.json(cats);
  } catch (err) { next(err); }
};

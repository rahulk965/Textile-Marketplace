import Vendor from '../models/Vendor.js';

export const getProfile = async (req, res, next) => {
  try {
    const vendor = await Vendor.findByPk(req.user.id);
    res.json(vendor);
  } catch (err) { next(err); }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { business_name, phone } = req.body;
    await Vendor.update({ business_name, phone }, { where: { id: req.user.id } });
    res.json({ message: 'Updated' });
  } catch (err) { next(err); }
};

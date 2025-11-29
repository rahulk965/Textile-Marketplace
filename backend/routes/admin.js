import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { listVendors, updateVendorStatus, createCategory, listCategories } from '../controllers/adminController.js';

const router = Router();
router.get('/vendors', requireAuth('admin'), listVendors);
router.put('/vendors/:id/status', requireAuth('admin'), updateVendorStatus);
router.post('/categories', requireAuth('admin'), createCategory);
router.get('/categories', requireAuth('admin'), listCategories);

export default router;

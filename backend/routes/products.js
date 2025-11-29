import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import { createProduct, listVendorProducts, listProductsAdmin, updateStatusAdmin } from '../controllers/productController.js';

const router = Router();
// Vendor
router.post('/', requireAuth('vendor'), upload.array('images', 8), createProduct);
router.get('/mine', requireAuth('vendor'), listVendorProducts);

// Admin
router.get('/', requireAuth('admin'), listProductsAdmin);
router.put('/:id/status', requireAuth('admin'), updateStatusAdmin);

export default router;

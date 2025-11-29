import { Router } from 'express';
import { registerVendor, loginVendor, loginAdmin } from '../controllers/authController.js';

const router = Router();
router.post('/vendor/register', registerVendor);
router.post('/vendor/login', loginVendor);
router.post('/admin/login', loginAdmin);

export default router;

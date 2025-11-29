import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { getProfile, updateProfile } from '../controllers/vendorController.js';

const router = Router();
router.get('/me', requireAuth('vendor'), getProfile);
router.put('/me', requireAuth('vendor'), updateProfile);

export default router;

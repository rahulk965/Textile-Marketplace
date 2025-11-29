import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();
router.post('/', requireAuth('vendor'), upload.array('images', 8), (req, res) => {
  res.json({ files: (req.files || []).map(f => ({ filename: f.filename, url: `/uploads/${f.filename}` })) });
});

export default router;

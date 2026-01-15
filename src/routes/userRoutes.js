import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {upload} from '../middleware/multer.js';
import {
  getCurrentUser,
  updateUser,
  updateAvatar,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/api/users/current', authenticate, getCurrentUser);
router.patch('/api/users/current', authenticate, updateUser);
router.patch('/api/users/avatar', authenticate, upload.single('avatar'), updateAvatar);

export default router;

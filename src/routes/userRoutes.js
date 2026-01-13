import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {upload} from '../middleware/multer.js';
import {
  getCurrentUser,
  updateUser,
  updateAvatar,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/current', authenticate, getCurrentUser);
router.patch('/current', authenticate, updateUser);
router.patch('/avatar', authenticate, upload.single('avatar'), updateAvatar);

export default router;

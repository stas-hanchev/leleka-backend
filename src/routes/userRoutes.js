import express from 'express';
import { auth } from '../middlewares/auth.js';
import upload from '../middleware/multer.js';
import {
  getCurrentUser,
  updateUser,
  updateAvatar,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/current', auth, getCurrentUser);
router.patch('/', auth, updateUser);
router.patch('/avatar', auth, upload.single('avatar'), updateAvatar);

export default router;

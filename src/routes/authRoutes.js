import { Router } from 'express';
import { celebrate } from 'celebrate';
import { register, login, logout } from '../controllers/authController.js';
import {
  registerUserSchema,
  loginUserSchema,
} from '../validations/authValidation.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/api/auth/register', celebrate(registerUserSchema), register);
router.post('/api/auth/login', celebrate(loginUserSchema), login);
router.post('/api/auth/logout', authMiddleware, logout);

export default router;

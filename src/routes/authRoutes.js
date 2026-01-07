import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  register,
  login,
  logout,
  sendWelcome,
} from '../controllers/authController.js';
import {
  registerUserSchema,
  loginUserSchema,
  welcomeSchema,
} from '../validations/authValidation.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/api/auth/register', celebrate(registerUserSchema), register);

router.post('/api/auth/login', celebrate(loginUserSchema), login);

router.post('/api/auth/logout', authMiddleware, logout);

router.patch(
  '/api/auth/:id/welcome',
  celebrate(welcomeSchema),
  authMiddleware,
  sendWelcome,
);

export default router;

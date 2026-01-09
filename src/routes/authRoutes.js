import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  registerUser,
  loginUser,
  logoutUser,
  // sendWelcome,
} from '../controllers/authController.js';
import {
  registerUserSchema,
  loginUserSchema,
  // welcomeSchema,
} from '../validations/authValidation.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

// Публічні ендпоінти
router.post('/api/auth/register', celebrate(registerUserSchema), registerUser);
router.post('/api/auth/login', celebrate(loginUserSchema), loginUser);

// Приватний ендпоінт logout
router.post('/api/auth/logout', authenticate, logoutUser);

// // Приватний PATCH для welcome форми
// router.patch(
//   '/api/auth/:id/welcome',
//   celebrate(welcomeSchema),
//   authenticate,
//   sendWelcome,
// );

export default router;

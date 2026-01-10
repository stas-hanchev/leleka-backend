import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  registerUser,
  loginUser,
  logoutUser,
  sendWelcome,
} from '../controllers/authController.js';
import {
  registerUserSchema,
  loginUserSchema,
  welcomeSchema,
} from '../validations/authValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.post('/api/auth/register', celebrate(registerUserSchema), registerUser);
router.post('/api/auth/login', celebrate(loginUserSchema), loginUser);

router.post('/api/auth/logout', authenticate, logoutUser);

router.patch(
  '/api/auth/:id',
  celebrate(welcomeSchema),
  authenticate,
  sendWelcome,
);

export default router;

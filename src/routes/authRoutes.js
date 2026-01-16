import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  registerUser,
  loginUser,
  logoutUser,
  sendWelcome,
  refreshUserSession,
  requestResetEmail,
  resetPassword
} from '../controllers/authController.js';
import {
  registerUserSchema,
  loginUserSchema,
  welcomeSchema,
  requestResetEmailSchema,
  resetPasswordSchema
} from '../validations/authValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.post('/api/auth/register', celebrate(registerUserSchema), registerUser);
router.post('/api/auth/login', celebrate(loginUserSchema), loginUser);
router.post('/api/auth/logout', authenticate, logoutUser);

//------------------------------------------------------------------------------------------------
router.post('/api/auth/refresh', refreshUserSession);
router.post(
  '/auth/request-reset-email',
  celebrate(requestResetEmailSchema),
  requestResetEmail,
);
router.post(
  '/auth/reset-password',
  celebrate(resetPasswordSchema),
  resetPassword
);
//------------------------------------------------------------------------------------------------

router.patch(
  '/api/auth/:id',
  celebrate(welcomeSchema),
  authenticate,
  sendWelcome,
);

export default router;

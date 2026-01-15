import { Router } from 'express';
import { celebrate } from 'celebrate';
import * as ctrl from '../controllers/weeksController.js';
import { authenticate } from '../middleware/authenticate.js';
import { weekNumberSchema, weekQuerySchema } from '../validations/weeks.js';

const router = Router();

router.get('/api/weeks/public', celebrate(weekQuerySchema), ctrl.getPublicDashboard);

router.use(authenticate);

router.get('/api/weeks/dashboard', ctrl.getPrivateDashboard);

router.get('/api/weeks/:weekNumber/baby', celebrate(weekNumberSchema), ctrl.getBabyDevelopment);
router.get('/api/weeks/:weekNumber/body', celebrate(weekNumberSchema), ctrl.getMomBody);

export default router;

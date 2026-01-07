import { Router } from 'express';
import { celebrate } from 'celebrate';
import * as ctrl from '../controllers/weeksController.js';
import { authenticate } from '../middleware/authenticate.js';
import { weekNumberSchema, weekQuerySchema } from '../validations/weeks.js';

const router = Router();

router.get('/weeks/public', celebrate(weekQuerySchema), ctrl.getPublicDashboard);

router.use(authenticate);

router.get('/weeks/dashboard', ctrl.getPrivateDashboard);

router.get('/weeks/:weekNumber/baby', celebrate(weekNumberSchema), ctrl.getBabyDevelopment);
router.get('/weeks/:weekNumber/body', celebrate(weekNumberSchema), ctrl.getMomBody);

export default router;

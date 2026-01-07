import { Router } from 'express';
import * as ctrl from '../controllers/weeksController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.get('/weeks/public', ctrl.getPublicDashboard);

router.use(authenticate);
router.get('/weeks/dashboard', ctrl.getPrivateDashboard);
router.get('/weeks/:weekNumber/baby', ctrl.getBabyDevelopment);
router.get('/weeks/:weekNumber/body', ctrl.getMomBody);

export default router;

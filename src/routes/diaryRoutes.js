import { Router } from 'express';
import { celebrate } from 'celebrate';
import * as diaryControllers from '../controllers/diaryController.js';
import {
  createDiarySchema,
  updateDiarySchema,
} from '../validations/diaryValidation.js';
import { auth } from '../middleware/auth.js';

const router = Router();

// Защищаем маршруты твоей мидлварой
router.use(auth);
router.get('/', diaryControllers.getDiaryEntries);
router.post(
  '/',
  celebrate(createDiarySchema),
  diaryControllers.createDiaryEntry,
);

router.patch(
  '/:entryId',
  celebrate(updateDiarySchema),
  diaryControllers.updateDiaryEntry,
);

export default router;

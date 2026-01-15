import { Router } from 'express';
import { celebrate } from 'celebrate';
import * as diaryControllers from '../controllers/diaryController.js';
import {
  createDiarySchema,
  updateDiarySchema,
  diaryEntryIdSchema,
} from '../validations/diaryValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

// Защищаем маршруты твоей мидлварой
router.use(auth);
router.get('/', diaryControllers.getDiaryEntries);
router.post(
  '/api/diaries',
  celebrate(createDiarySchema),
  diaryControllers.createDiaryEntry,
);

router.patch(
  '/api/diaries/:entryId',
  celebrate(updateDiarySchema),
  diaryControllers.updateDiaryEntry,
);

export default router;

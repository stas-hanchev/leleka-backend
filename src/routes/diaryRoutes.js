import { Router } from 'express';
import { celebrate } from 'celebrate';
import * as diaryControllers from '../controllers/diaryController.js';
import {
  createDiarySchema,
  updateDiarySchema,
} from '../validations/diaryValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

// Защищаем маршруты твоей мидлварой
router.use(authenticate);
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
router.delete('/:entryId', diaryControllers.deleteDiaryEntry);
export default router;

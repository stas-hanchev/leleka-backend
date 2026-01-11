import { Router } from 'express';
import { celebrate } from 'celebrate';
import * as diaryControllers from '../controllers/diaryController.js';
import {
  createDiarySchema,
  updateDiarySchema,
  diaryEntryIdSchema
} from '../validations/diaryValidation.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.use(auth);

router.get('/api/diaries', diaryControllers.getDiaryEntries);

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

router.delete(
  "/api/diaries/:entryId",
  celebrate(diaryEntryIdSchema),
  diaryControllers.deleteDiaryEntry
);

export default router;

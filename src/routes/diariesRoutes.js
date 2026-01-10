import express from 'express';
import { celebrate } from 'celebrate';

import authenticate from '../middleware/authenticate.js';
import {
  createDiary,
  getDiaries,
  updateDiary,
  deleteDiary,
} from '../controllers/diariesController.js';

import {
  createDiarySchema,
  updateDiarySchema,
} from '../validations/diaryValidation.js';

const router = express.Router();

router.use(authenticate);

router.post('/', celebrate(createDiarySchema), createDiary);
router.get('/', getDiaries);
router.patch('/:id', celebrate(updateDiarySchema), updateDiary);
router.delete('/:id', deleteDiary);

export default router;

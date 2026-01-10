import { Joi, Segments } from 'celebrate';

export const createDiarySchema = {
  [Segments.BODY]: Joi.object({
    date: Joi.string()
      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .required(),

    text: Joi.string().min(3).max(1000).required(),

    mood: Joi.string().valid('happy', 'neutral', 'sad').default('neutral'),
  }),
};

export const updateDiarySchema = {
  [Segments.BODY]: Joi.object({
    date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/),
    text: Joi.string().min(3).max(1000),
    mood: Joi.string().valid('happy', 'neutral', 'sad'),
  }).min(1),
};

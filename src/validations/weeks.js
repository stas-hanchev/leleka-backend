import { Joi, Segments } from 'celebrate';

export const weekNumberSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    weekNumber: Joi.number().integer().min(1).max(42).required(),
  }),
};

export const weekQuerySchema = {
  [Segments.QUERY]: Joi.object().keys({
    week: Joi.number().integer().min(1).max(42).optional(),
  }),
};

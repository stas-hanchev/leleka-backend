import { Joi } from 'celebrate';

export const createDiarySchema = {
  body: Joi.object().keys({
    title: Joi.string().min(2).max(50).required(),
    categories: Joi.array().items(Joi.string()).min(1).required(),
    text: Joi.string().min(2).max(5000).required(),
    date: Joi.date().optional(),
  }),
};

export const updateDiarySchema = {
  body: Joi.object()
    .keys({
      title: Joi.string().min(2).max(50),
      categories: Joi.array().items(Joi.string()).min(1),
      text: Joi.string().min(2).max(5000),
      date: Joi.date(),
    })
    .min(1),
};

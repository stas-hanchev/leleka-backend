import { Joi, Segments } from "celebrate";

const validateFutureDate = (value, helpers) => {
  const inputDate = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (inputDate < today) {
    return helpers.message('Дата не може бути в минулому');
  }

  return value;
};


export const createTaskSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(1).max(96).required(),
    date: Joi.string()
      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .custom(validateFutureDate)
      .default(Date.now),
    isDone: Joi.boolean().default(false),
  })
};

export const updateTaskSchema = {
  [Segments.BODY]: Joi.object({
    isDone: Joi.boolean().required(),
  })
};





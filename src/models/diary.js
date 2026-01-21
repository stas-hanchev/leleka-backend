import { Schema, model } from 'mongoose';

const diarySchema = new Schema(
  {

    title: {
      type: String,
      required: [true, "Заголовок обов'язковий"],
      trim: true,
    },

    categories: {
      type: [String],
      required: [true, 'Необхідно вказати хоча б одну категорію'],

    },

    text: {
      type: String,
      required: [true, "Текст запису є обов'язковим"],
    },

    date: {
      type: Date,
      default: Date.now,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {

    timestamps: true,

    versionKey: false,
  },
);


export const Diary = model('diary', diarySchema);

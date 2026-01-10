import { Schema, model } from 'mongoose';

const diarySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    mood: {
      type: String,
      enum: ['happy', 'neutral', 'sad'],
      default: 'neutral',
    },
  },
  { timestamps: true },
);

export default model('Diary', diarySchema);

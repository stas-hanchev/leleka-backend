import { model, Schema } from "mongoose";

const taskSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
);

export const Task = model('Task', taskSchema);



import mongoose from "mongoose";

const diarySchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    mood: {
      type: String,
      enum: ["happy", "sad", "neutral", "anxious"],
      required: true,
    },
    note: {
      type: String,
      maxlength: 1000,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Diary", diarySchema);

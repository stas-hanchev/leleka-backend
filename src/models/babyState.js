import { Schema, model } from 'mongoose';

const babyStateSchema = new Schema({
  weekNumber: { type: Number, required: true },
  analogy: { type: String },
  babySize: { type: Number },
  babyWeight: { type: Number },
  babyActivity: { type: String },
  babyDevelopment: { type: String },
  image: { type: String },
  interestingFact: { type: String },
  momDailyTips: [String],
}, { collection: 'baby_states' });

export const BabyState = model('BabyState', babyStateSchema);

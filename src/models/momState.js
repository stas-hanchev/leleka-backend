import { Schema, model } from 'mongoose';

const momStateSchema = new Schema({
  weekNumber: { type: Number, required: true },
  comfortTips: [{ title: String, description: String }],
  feelings: { physical: String, emotional: String }
}, { collection: 'mom_states' });

export const MomState = model('MomState', momStateSchema);

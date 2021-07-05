import { Schema, model } from 'mongoose';

const fightsDoc = new Schema({
  loser: { type: String, required: true },
  channel: { type: String, required: true },
  mutedUntil: { type: Date, required: true }
});

export default model("fights", fightsDoc);

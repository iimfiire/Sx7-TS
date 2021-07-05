import { Schema, model } from 'mongoose';

const cooldownsDoc = new Schema({
  uID: { type: String, required: true },
  cmdName: { type: String, required: true },
  cooldown: { type: Date, required: true },
});

export default model("cooldowns", cooldownsDoc);

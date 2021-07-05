import { Schema, model } from 'mongoose';

const disabledCommandsDoc = new Schema({
  gID: {type: String, required: true},
  disabled: { type: [String], required: true }
});

export default model("disabledCommands", disabledCommandsDoc);

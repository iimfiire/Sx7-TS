import { Schema, model } from 'mongoose';

const disabledCommandsDoc = new Schema({
  gID: {type: String, required: true},
  disabled: { type: [Object], required: true },
});

export default model("disabledCommands", disabledCommandsDoc);

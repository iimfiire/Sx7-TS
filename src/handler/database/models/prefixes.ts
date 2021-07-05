import { Schema, model } from 'mongoose';

const prefixDoc = new Schema({
  gID: { type: String, required: true },
  prefixes: { type: [String], required: true }
});

export default model("prefixes", prefixDoc);

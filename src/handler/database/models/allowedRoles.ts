import { Schema, model } from 'mongoose';

const allowedRolesDoc = new Schema({
  gID: { type: String, required: true},
  allowed: {type: [Object], required: true}
});

export default model("allowedRoles", allowedRolesDoc);

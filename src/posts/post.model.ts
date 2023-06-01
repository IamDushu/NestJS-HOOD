import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  description: { type: String, required: true },
});

export interface Feed {
  userId: Number;
  firstName: string;
  lastName: string;
  description: String;
}



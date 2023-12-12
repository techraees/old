// models/user.ts
import mongoose, { Document, Schema, Model } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  age: number;
}

export const UserModel: Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>('User', new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
  }));

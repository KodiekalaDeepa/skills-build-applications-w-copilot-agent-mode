import { Schema, model, Document, Types } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  role: string;
  team?: Types.ObjectId;
  createdAt: Date;
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: 'member' },
  team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
  createdAt: { type: Date, default: () => new Date() },
});

export const UserModel = model<UserDocument>('User', userSchema);

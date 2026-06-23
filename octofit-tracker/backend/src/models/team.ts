import { Schema, model, Document, Types } from 'mongoose';

export interface TeamDocument extends Document {
  name: string;
  description: string;
  members: Types.ObjectId[];
  createdAt: Date;
}

const teamSchema = new Schema<TeamDocument>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: () => new Date() },
});

export const TeamModel = model<TeamDocument>('Team', teamSchema);

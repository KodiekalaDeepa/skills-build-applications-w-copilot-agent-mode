import { Schema, model, Document, Types } from 'mongoose';

export interface LeaderboardDocument extends Document {
  user: Types.ObjectId;
  score: number;
  rank: number;
  season: string;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<LeaderboardDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
  season: { type: String, required: true },
  updatedAt: { type: Date, default: () => new Date() },
});

export const LeaderboardModel = model<LeaderboardDocument>('Leaderboard', leaderboardSchema);

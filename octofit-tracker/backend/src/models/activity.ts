import { Schema, model, Document, Types } from 'mongoose';

export interface ActivityDocument extends Document {
  user: Types.ObjectId;
  type: string;
  distanceKm: number;
  durationMin: number;
  caloriesBurned: number;
  date: Date;
}

const activitySchema = new Schema<ActivityDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  distanceKm: { type: Number, required: true },
  durationMin: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, required: true },
});

export const ActivityModel = model<ActivityDocument>('Activity', activitySchema);

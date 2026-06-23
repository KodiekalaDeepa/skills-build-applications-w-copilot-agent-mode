import { Schema, model, Document, Types } from 'mongoose';

export interface WorkoutDocument extends Document {
  title: string;
  description: string;
  durationMin: number;
  intensity: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
}

const workoutSchema = new Schema<WorkoutDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  durationMin: { type: Number, required: true },
  intensity: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: () => new Date() },
});

export const WorkoutModel = model<WorkoutDocument>('Workout', workoutSchema);

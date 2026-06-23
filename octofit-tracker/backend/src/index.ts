import express from 'express';
import { UserModel } from './models/user';
import { TeamModel } from './models/team';
import { ActivityModel } from './models/activity';
import { LeaderboardModel } from './models/leaderboard';
import { WorkoutModel } from './models/workout';

const app = express();

app.use(express.json());

app.get('/api/users/', async (_req, res) => {
  const users = await UserModel.find().populate('team', 'name description').lean();
  res.json({ users });
});

app.get('/api/teams/', async (_req, res) => {
  const teams = await TeamModel.find().populate('members', 'name email role').lean();
  res.json({ teams });
});

app.get('/api/activities/', async (_req, res) => {
  const activities = await ActivityModel.find().populate('user', 'name email').lean();
  res.json({ activities });
});

app.get('/api/leaderboard/', async (_req, res) => {
  const leaderboard = await LeaderboardModel.find().populate('user', 'name email').sort({ rank: 1 }).lean();
  res.json({ leaderboard });
});

app.get('/api/workouts/', async (_req, res) => {
  const workouts = await WorkoutModel.find().populate('createdBy', 'name email').lean();
  res.json({ workouts });
});

export default app;

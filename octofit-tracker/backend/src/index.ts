import express, { Request, Response } from 'express';
import { connectDatabase, API_URL, MONGO_URI } from './config/database';
import { UserModel } from './models/user';
import { TeamModel } from './models/team';
import { ActivityModel } from './models/activity';
import { LeaderboardModel } from './models/leaderboard';
import { WorkoutModel } from './models/workout';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'OctoFit Tracker backend is running.',
    apiUrl: API_URL,
    mongoUri: MONGO_URI,
  });
});

app.get('/api/users/', async (_req: Request, res: Response) => {
  const users = await UserModel.find().populate('team', 'name description').lean();
  res.json({ users });
});

app.get('/api/teams/', async (_req: Request, res: Response) => {
  const teams = await TeamModel.find().populate('members', 'name email role').lean();
  res.json({ teams });
});

app.get('/api/activities/', async (_req: Request, res: Response) => {
  const activities = await ActivityModel.find().populate('user', 'name email').lean();
  res.json({ activities });
});

app.get('/api/leaderboard/', async (_req: Request, res: Response) => {
  const leaderboard = await LeaderboardModel.find().populate('user', 'name email').sort({ rank: 1 }).lean();
  res.json({ leaderboard });
});

app.get('/api/workouts/', async (_req: Request, res: Response) => {
  const workouts = await WorkoutModel.find().populate('createdBy', 'name email').lean();
  res.json({ workouts });
});

connectDatabase()
  .then(() => {
    console.log('Connected to MongoDB');
    console.log(`API URL: ${API_URL}`);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

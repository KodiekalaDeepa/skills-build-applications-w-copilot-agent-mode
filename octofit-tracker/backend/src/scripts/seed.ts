import mongoose from 'mongoose';
import { MONGO_URI } from '../config/database';
import { UserModel } from '../models/user';
import { TeamModel } from '../models/team';
import { ActivityModel } from '../models/activity';
import { LeaderboardModel } from '../models/leaderboard';
import { WorkoutModel } from '../models/workout';

// Seed the octofit_db database with test data

async function seed() {
  await mongoose.connect(MONGO_URI);

  console.log('Connected to MongoDB and beginning seed process');

  await Promise.all([
    UserModel.deleteMany({}),
    TeamModel.deleteMany({}),
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ]);

  console.log('Cleared existing collections');

  const users = await UserModel.create([
    { name: 'Maya Brooks', email: 'maya.brooks@example.com', role: 'captain' },
    { name: 'Leo Chen', email: 'leo.chen@example.com', role: 'member' },
    { name: 'Nina Patel', email: 'nina.patel@example.com', role: 'member' },
  ]);

  const teams = await TeamModel.create([
    {
      name: 'Octo Striders',
      description: 'A group focused on endurance and interval training.',
      members: [users[0]._id, users[1]._id],
    },
    {
      name: 'Pulse Pioneers',
      description: 'Team for balanced strength and cardio workouts.',
      members: [users[2]._id],
    },
  ]);

  await UserModel.updateMany(
    { _id: { $in: teams[0].members } },
    { $set: { team: teams[0]._id } }
  );
  await UserModel.updateOne({ _id: users[2]._id }, { $set: { team: teams[1]._id } });

  const activities = await ActivityModel.create([
    {
      user: users[0]._id,
      type: 'Run',
      distanceKm: 8.5,
      durationMin: 50,
      caloriesBurned: 620,
      date: new Date('2026-06-10T07:00:00Z'),
    },
    {
      user: users[1]._id,
      type: 'Cycling',
      distanceKm: 24,
      durationMin: 75,
      caloriesBurned: 820,
      date: new Date('2026-06-11T07:30:00Z'),
    },
    {
      user: users[2]._id,
      type: 'Strength',
      distanceKm: 0,
      durationMin: 40,
      caloriesBurned: 450,
      date: new Date('2026-06-12T08:00:00Z'),
    },
  ]);

  const leaderboard = await LeaderboardModel.create([
    { user: users[0]._id, score: 1680, rank: 1, season: 'Summer 2026' },
    { user: users[1]._id, score: 1540, rank: 2, season: 'Summer 2026' },
    { user: users[2]._id, score: 1490, rank: 3, season: 'Summer 2026' },
  ]);

  const workouts = await WorkoutModel.create([
    {
      title: 'Morning Power Circuit',
      description: 'A high-intensity circuit training session designed for strength and stamina.',
      durationMin: 45,
      intensity: 'High',
      createdBy: users[0]._id,
    },
    {
      title: 'Recovery Flow',
      description: 'Mobility and stretching routine for active recovery.',
      durationMin: 30,
      intensity: 'Low',
      createdBy: users[2]._id,
    },
  ]);

  console.log('Seeded sample data for users, teams, activities, leaderboard, and workouts');
  console.log({ users: users.length, teams: teams.length, activities: activities.length, leaderboard: leaderboard.length, workouts: workouts.length });

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB after seeding octofit_db');
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});

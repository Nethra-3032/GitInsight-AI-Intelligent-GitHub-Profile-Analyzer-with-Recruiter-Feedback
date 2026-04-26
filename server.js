import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

import githubRoutes from './routes/github.js';
import leaderboardRoutes from './routes/leaderboard.js';

app.use('/api/github', githubRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
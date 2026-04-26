import express from 'express';
const router = express.Router();
import { getLeaderboard } from '../controllers/leaderboardController.js';

router.get('/', getLeaderboard);

export default router;
import express from 'express';
const router = express.Router();
import { analyzeGitHub } from '../controllers/githubController.js';

router.get('/:username', analyzeGitHub);

export default router;
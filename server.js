import express from "express";
import cors from "cors";
import axios from "axios";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/campusconnect");

// Schema
const User = mongoose.model("User", {
  username: String,
  score: Number
});

// 🔥 AI ANALYSIS ENGINE
function analyzeProfile(repos) {
  let score = 0;
  let feedback = [];

  const totalRepos = repos.length;
  const stars = repos.reduce((a, r) => a + r.stargazers_count, 0);
  const forks = repos.reduce((a, r) => a + r.forks_count, 0);
  const readme = repos.filter(r => r.description).length;
  const recent = repos.filter(r =>
    new Date(r.updated_at) > new Date(Date.now() - 30*24*60*60*1000)
  ).length;

  score += totalRepos * 2;
  score += stars * 3;
  score += forks * 2;
  score += readme * 2;
  score += recent * 5;

  // AI Feedback
  if (totalRepos < 5) feedback.push("Add more projects");
  if (stars < 10) feedback.push("Increase project quality to gain stars");
  if (readme < totalRepos) feedback.push("Improve README documentation");
  if (recent === 0) feedback.push("Be active on GitHub");

  return {
    score: Math.min(score, 100),
    feedback: feedback.join(", ") || "Excellent profile 🚀"
  };
}

// 🔥 API: Analyze GitHub
app.get("/api/github/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const user = await axios.get(`https://api.github.com/users/${username}`);
    const repos = await axios.get(user.data.repos_url);

    const result = analyzeProfile(repos.data);

    // Save leaderboard
    await User.findOneAndUpdate(
      { username },
      { username, score: result.score },
      { upsert: true }
    );

    res.json({
      profile: user.data,
      repos: repos.data,
      score: result.score,
      feedback: result.feedback
    });

  } catch {
    res.status(500).json({ error: "GitHub fetch failed" });
  }
});

// 🔥 Leaderboard API
app.get("/api/leaderboard", async (req, res) => {
  const users = await User.find().sort({ score: -1 }).limit(10);
  res.json(users);
});

app.listen(5000, () => console.log("Server running on 5000"));
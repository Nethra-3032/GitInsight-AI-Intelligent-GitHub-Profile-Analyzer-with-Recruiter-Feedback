import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Leaderboard from "../components/Leaderboard";
import RepoCard from "../components/RepoCard";

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);

  const analyze = async () => {
    const res = await axios.get(`http://localhost:5000/api/github/${username}`);
    setData(res.data);
  };

  return (
    <div className="p-6">

      <motion.h1
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="text-4xl text-center mb-6"
      >
        🚀 CampusConnect AI
      </motion.h1>

      <div className="flex justify-center gap-4">
        <input
          className="p-3 rounded text-black"
          placeholder="GitHub Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={analyze}
          className="bg-blue-500 px-6 py-2 rounded"
        >
          Analyze
        </button>
      </div>

      {data && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mt-6 bg-gray-900 p-6 rounded"
        >
          <h2>{data.profile.login}</h2>
          <p>Score: {data.score}</p>
          <p className="text-green-400">{data.feedback}</p>

          <div className="grid grid-cols-3 gap-4 mt-4">
            {data.repos.slice(0,6).map((repo, i) => (
              <RepoCard key={i} repo={repo} />
            ))}
          </div>
        </motion.div>
      )}

      <Leaderboard />

    </div>
  );
}
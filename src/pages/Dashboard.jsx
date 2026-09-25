import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import ScoreCard from "../components/ScoreCard";
import StatsChart from "../components/StatsChart";
import Suggestions from "../components/Suggestions";
import RepoCard from "../components/RepoCard";
import Leaderboard from "../components/Leaderboard";

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!username) return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`/api/github/${username}`);
      setData(res.data);
    } catch (e) {
      setError(e.response?.data?.error || "Something went wrong.");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <motion.h1
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="text-4xl text-center mb-6"
      >
        🚀 GitInsight AI
      </motion.h1>

      <div className="flex justify-center gap-4 mb-4">
        <input
          className="p-3 rounded text-black"
          placeholder="GitHub Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && analyze()}
        />
        <button
          onClick={analyze}
          disabled={loading}
          className="bg-blue-500 px-6 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      <label className="flex justify-center items-center gap-2 mb-6">
        <input
          type="checkbox"
          checked={recruiterMode}
          onChange={(e) => setRecruiterMode(e.target.checked)}
        />
        Recruiter Mode
      </label>

      {error && <p className="text-center text-red-400 mb-6">{error}</p>}

      {data && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-6">
          <ScoreCard score={data.score} streak={data.streak} />
          <StatsChart data={data} />
          <Suggestions suggestions={data.suggestions} recruiterMode={recruiterMode} />

          {data.weakRepos?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {data.weakRepos.map((repo, i) => (
                <RepoCard key={i} repo={repo} />
              ))}
            </div>
          )}
        </motion.div>
      )}

      <Leaderboard />
    </div>
  );
}

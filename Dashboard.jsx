import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ScoreCard from '../components/ScoreCard';
import Suggestions from '../components/Suggestions';
import RepoCard from '../components/RepoCard';
import StatsChart from '../components/StatsChart';

function Dashboard() {
  const [username, setUsername] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recruiterMode, setRecruiterMode] = useState(false);

  const analyze = async () => {
    setLoading(true);
    setData(null);
    try {
      const res = await axios.get(`http://localhost:5000/api/github/${username}`);
      setData(res.data);
    } catch (e) {
      setData({ error: e.response?.data?.error || 'An error occurred. Please try again.' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
      <motion.h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>CampusConnect AI</motion.h1>
      <div className="text-center mb-8">
        <Link to="/leaderboard" className="bg-blue-600 px-4 py-2 rounded mr-4">View Leaderboard</Link>
        <button onClick={() => setRecruiterMode(!recruiterMode)} className="bg-purple-600 px-4 py-2 rounded">
          {recruiterMode ? 'Developer View' : 'Recruiter View'}
        </button>
      </div>
      <div className="max-w-md mx-auto mb-8">
        <input className="w-full p-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded" placeholder="GitHub Username" value={username} onChange={e => setUsername(e.target.value)} />
        <button onClick={analyze} className="w-full mt-2 p-2 bg-blue-600 rounded" disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>
      {loading && (
        <div className="text-center mb-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          <p className="mt-2">Analyzing your GitHub profile...</p>
        </div>
      )}
      {data && !data.error && (
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <ScoreCard score={data.score} streak={data.streak} />
          <StatsChart data={data} />
          <Suggestions suggestions={data.suggestions} recruiterMode={recruiterMode} />
          <h2 className="text-2xl font-bold mb-4">Weak Repositories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.weakRepos.map(repo => <RepoCard key={repo.name} name={repo.name} url={repo.url} />)}
          </div>
        </motion.div>
      )}
      {data && data.error && (
        <div className="text-center text-red-400 bg-red-900/20 p-4 rounded">
          {data.error}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
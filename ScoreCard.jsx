import { motion } from 'framer-motion';

function ScoreCard({ score, streak, badge }) {
  const getBadge = (score) => {
    if (score < 30) return 'Beginner';
    if (score < 70) return 'Pro';
    return 'Elite';
  };
  return (
    <motion.div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-lg shadow-lg mb-8" whileHover={{ scale: 1.05 }}>
      <h2 className="text-2xl font-bold mb-4">GitHub Strength Score</h2>
      <div className="text-6xl font-bold text-blue-400 mb-2">{score}/100</div>
      <div className="text-xl mb-2">Badge: {getBadge(score)}</div>
      <div className="text-lg mb-4">Activity Streak: {streak} days</div>
      <div className="w-full bg-gray-700 rounded-full h-4 mt-4">
        <motion.div className="bg-blue-400 h-4 rounded-full" initial={{ width: 0 }} animate={{ width: `${score}%` }} transition={{ duration: 1 }}></motion.div>
      </div>
    </motion.div>
  );
}

export default ScoreCard;
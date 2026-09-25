import { motion } from 'framer-motion';

function Suggestions({ suggestions, recruiterMode }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{recruiterMode ? 'Recruiter Feedback' : 'Improvement Suggestions'}</h2>
      {suggestions.map((s, i) => (
        <motion.div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded mb-2" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}>
          {recruiterMode ? `As a recruiter, I notice: ${s}` : s}
        </motion.div>
      ))}
    </div>
  );
}

export default Suggestions;
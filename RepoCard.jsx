import { motion } from "framer-motion";

export default function RepoCard({ repo }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="bg-gray-800 p-4 rounded"
    >
      <h3 className="font-bold">{repo.name}</h3>
      <p>⭐ {repo.stargazers_count}</p>
    </motion.div>
  );
}
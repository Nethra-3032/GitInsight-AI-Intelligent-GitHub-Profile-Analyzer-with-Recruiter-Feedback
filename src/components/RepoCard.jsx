import { motion } from "framer-motion";

export default function RepoCard({ repo }) {
  const content = (
    <>
      <h3 className="font-bold">{repo.name}</h3>
      {typeof repo.stargazers_count === "number" && <p>⭐ {repo.stargazers_count}</p>}
    </>
  );

  if (repo.url) {
    return (
      <motion.a
        href={repo.url}
        target="_blank"
        rel="noreferrer"
        whileHover={{ scale: 1.1 }}
        className="bg-gray-800 p-4 rounded block"
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div whileHover={{ scale: 1.1 }} className="bg-gray-800 p-4 rounded">
      {content}
    </motion.div>
  );
}

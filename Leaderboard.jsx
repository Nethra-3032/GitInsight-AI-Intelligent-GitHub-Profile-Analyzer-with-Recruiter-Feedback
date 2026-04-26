import { useEffect, useState } from "react";
import axios from "axios";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/leaderboard")
      .then(res => setUsers(res.data));
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-2xl mb-4">🏆 Leaderboard</h2>

      {users.map((u, i) => (
        <div key={i} className="bg-gray-800 p-3 mb-2 rounded flex justify-between">
          <span>{u.username}</span>
          <span>{u.score}</span>
        </div>
      ))}
    </div>
  );
}
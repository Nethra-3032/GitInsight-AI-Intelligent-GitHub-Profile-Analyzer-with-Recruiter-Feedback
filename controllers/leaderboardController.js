const getLeaderboard = async (req, res) => {
  // Mock leaderboard data since no DB
  const mockUsers = [
    { username: 'octocat', score: 95 },
    { username: 'torvalds', score: 98 },
    { username: 'gaearon', score: 92 },
    { username: 'tj', score: 88 },
    { username: 'sindresorhus', score: 90 },
    { username: 'addyosmani', score: 85 },
    { username: 'paulirish', score: 87 },
    { username: 'getify', score: 83 },
    { username: 'brianleroux', score: 80 },
    { username: 'substack', score: 82 }
  ];
  res.json(mockUsers);
};

export { getLeaderboard };
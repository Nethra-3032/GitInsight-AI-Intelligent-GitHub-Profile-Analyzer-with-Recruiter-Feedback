import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

function StatsChart({ data }) {
  const barData = [
    { name: 'Repos', value: data.totalRepos },
    { name: 'Stars', value: data.totalStars },
    { name: 'Forks', value: data.totalForks },
    { name: 'Followers', value: data.followers },
  ];
  const pieData = data.languages.map(([lang, count]) => ({ name: lang, value: count }));
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00'];

  return (
    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Repository Stats</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Top Languages</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default StatsChart;
import type { Config, Context } from "@netlify/functions";
import axios from "axios";
import { db } from "../../db/index.js";
import { leaderboard } from "../../db/schema.js";

export default async (req: Request, context: Context) => {
  const { username } = context.params;
  const token =
    process.env.GITHUB_TOKEN && process.env.GITHUB_TOKEN !== "your_github_token_here"
      ? process.env.GITHUB_TOKEN
      : null;
  const headers = token ? { Authorization: `token ${token}` } : {};

  try {
    const userResponse = await axios.get(`https://api.github.com/users/${username}`, { headers });
    const user = userResponse.data;

    const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`, { headers });
    const repos = reposResponse.data;

    let totalStars = 0;
    let totalForks = 0;
    const repoCount = repos.length;
    let readmeCount = 0;
    let activeRepos = 0;
    const languages: Record<string, number> = {};

    for (const repo of repos.slice(0, 20)) {
      totalStars += repo.stargazers_count;
      totalForks += repo.forks_count;
      if (new Date(repo.updated_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) activeRepos++;
      try {
        await axios.get(`https://api.github.com/repos/${username}/${repo.name}/contents/README.md`, { headers });
        readmeCount++;
      } catch {
        // README not found or access denied
      }
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    }

    const score = Math.min(
      100,
      Math.round(
        repoCount * 3 +
          totalStars * 1.5 +
          totalForks * 1 +
          readmeCount * 5 +
          activeRepos * 4 +
          user.followers * 0.5 +
          user.public_repos * 0.2
      ) / 5
    );

    const suggestions: string[] = [];
    if (readmeCount < repoCount) suggestions.push(`Add README to ${repoCount - readmeCount} repos for better documentation.`);
    if (totalStars < 10) suggestions.push("Contribute to open-source projects to gain more stars and visibility.");
    if (repoCount < 5) suggestions.push("Create more diverse projects to showcase your skills.");
    if (user.followers < 10) suggestions.push("Engage with the community to grow your network.");

    const weakRepos = repos
      .filter((r: any) => r.stargazers_count === 0 && !r.description)
      .slice(0, 5)
      .map((r: any) => ({ name: r.name, url: r.html_url }));

    const streak = Math.min(activeRepos * 2, 30);

    await db
      .insert(leaderboard)
      .values({ username, score })
      .onConflictDoUpdate({ target: leaderboard.username, set: { score, updatedAt: new Date() } });

    return Response.json({
      score,
      suggestions,
      weakRepos,
      totalRepos: repoCount,
      totalStars,
      totalForks,
      followers: user.followers,
      streak,
      languages: Object.entries(languages)
        .sort((a, b) => (b[1] as number) - (a[1] as number))
        .slice(0, 5),
    });
  } catch (e: any) {
    let errorMsg = "User not found or API error.";
    if (e.response?.status === 403) {
      errorMsg = "API rate limit exceeded. Please wait or add a GitHub token for higher limits.";
    } else if (e.response?.status === 401) {
      errorMsg = "Invalid GitHub token. Please check your token in .env.";
    } else if (e.response?.status === 404) {
      errorMsg = "User not found. Please check the username.";
    }
    return Response.json({ error: errorMsg }, { status: 500 });
  }
};

export const config: Config = {
  path: "/api/github/:username",
};

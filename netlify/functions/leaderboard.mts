import type { Config } from "@netlify/functions";
import { desc } from "drizzle-orm";
import { db } from "../../db/index.js";
import { leaderboard } from "../../db/schema.js";

export default async () => {
  const top = await db
    .select({ username: leaderboard.username, score: leaderboard.score })
    .from(leaderboard)
    .orderBy(desc(leaderboard.score))
    .limit(10);

  return Response.json(top);
};

export const config: Config = {
  path: "/api/leaderboard",
};

import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const leaderboard = pgTable("leaderboard", {
  id: serial().primaryKey(),
  username: text().notNull().unique(),
  score: integer().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

CREATE TABLE "leaderboard" (
	"id" serial PRIMARY KEY,
	"username" text NOT NULL UNIQUE,
	"score" integer NOT NULL,
	"updated_at" timestamp DEFAULT now()
);

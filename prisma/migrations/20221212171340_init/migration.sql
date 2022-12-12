-- CreateEnum
CREATE TYPE "MatchEventType" AS ENUM ('GOAL', 'YELLOW_CARD', 'RED_CARD', 'SUBSTITUTION');

-- CreateEnum
CREATE TYPE "MatchEventActorType" AS ENUM ('SCORER', 'ASSIST', 'OG', 'CARD_TAKER', 'SUB_IN', 'SUB_OUT');

-- CreateTable
CREATE TABLE "tournaments" (
    "id" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "type" VARCHAR NOT NULL,

    CONSTRAINT "tournaments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "shortName" VARCHAR(4) NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matches" (
    "id" VARCHAR NOT NULL,
    "tournamentId" VARCHAR NOT NULL,
    "kickOff" TIMESTAMPTZ NOT NULL,
    "extraTime" BOOLEAN NOT NULL,
    "penaltyShootout" BOOLEAN NOT NULL,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "match-teams" (
    "id" VARCHAR NOT NULL,
    "matchId" VARCHAR NOT NULL,
    "teamId" VARCHAR NOT NULL,

    CONSTRAINT "match-teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "match-events" (
    "id" VARCHAR NOT NULL,
    "matchTeamId" VARCHAR NOT NULL,
    "type" "MatchEventType" NOT NULL,
    "minute" INTEGER NOT NULL,

    CONSTRAINT "match-events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "match-event-actors" (
    "id" VARCHAR NOT NULL,
    "matchEventId" VARCHAR NOT NULL,
    "player" VARCHAR NOT NULL,
    "type" "MatchEventActorType" NOT NULL,

    CONSTRAINT "match-event-actors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "match-teams_matchId_teamId_key" ON "match-teams"("matchId", "teamId");

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "tournaments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "match-teams" ADD CONSTRAINT "match-teams_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "matches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "match-teams" ADD CONSTRAINT "match-teams_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "match-events" ADD CONSTRAINT "match-events_matchTeamId_fkey" FOREIGN KEY ("matchTeamId") REFERENCES "match-teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "match-event-actors" ADD CONSTRAINT "match-event-actors_matchEventId_fkey" FOREIGN KEY ("matchEventId") REFERENCES "match-events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

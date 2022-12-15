/*
  Warnings:

  - You are about to alter the column `kickOff` on the `matches` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- DropForeignKey
ALTER TABLE `match-event-actors` DROP FOREIGN KEY `match-event-actors_matchEventId_fkey`;

-- DropForeignKey
ALTER TABLE `match-events` DROP FOREIGN KEY `match-events_matchTeamId_fkey`;

-- DropForeignKey
ALTER TABLE `match-teams` DROP FOREIGN KEY `match-teams_matchId_fkey`;

-- DropForeignKey
ALTER TABLE `matches` DROP FOREIGN KEY `matches_tournamentId_fkey`;

-- DropForeignKey
ALTER TABLE `seasons` DROP FOREIGN KEY `seasons_tournamentId_fkey`;

-- AlterTable
ALTER TABLE `matches` MODIFY `kickOff` TIMESTAMP NULL;

-- AddForeignKey
ALTER TABLE `seasons` ADD CONSTRAINT `seasons_tournamentId_fkey` FOREIGN KEY (`tournamentId`) REFERENCES `tournaments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `matches` ADD CONSTRAINT `matches_tournamentId_fkey` FOREIGN KEY (`tournamentId`) REFERENCES `tournaments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `match-teams` ADD CONSTRAINT `match-teams_matchId_fkey` FOREIGN KEY (`matchId`) REFERENCES `matches`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `match-events` ADD CONSTRAINT `match-events_matchTeamId_fkey` FOREIGN KEY (`matchTeamId`) REFERENCES `match-teams`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `match-event-actors` ADD CONSTRAINT `match-event-actors_matchEventId_fkey` FOREIGN KEY (`matchEventId`) REFERENCES `match-events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

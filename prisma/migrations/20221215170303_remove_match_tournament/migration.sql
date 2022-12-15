/*
  Warnings:

  - You are about to drop the column `tournamentId` on the `matches` table. All the data in the column will be lost.
  - You are about to alter the column `kickOff` on the `matches` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- DropForeignKey
ALTER TABLE `matches` DROP FOREIGN KEY `matches_tournamentId_fkey`;

-- AlterTable
ALTER TABLE `matches` DROP COLUMN `tournamentId`,
    MODIFY `kickOff` TIMESTAMP NULL;

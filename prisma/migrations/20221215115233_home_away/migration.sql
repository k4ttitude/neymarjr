/*
  Warnings:

  - You are about to alter the column `kickOff` on the `matches` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `match-teams` ADD COLUMN `isHome` BOOLEAN NULL;

-- AlterTable
ALTER TABLE `matches` MODIFY `kickOff` TIMESTAMP NULL,
    MODIFY `extraTime` BOOLEAN NULL,
    MODIFY `penaltyShootout` BOOLEAN NULL;

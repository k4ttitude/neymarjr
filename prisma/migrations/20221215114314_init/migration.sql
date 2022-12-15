-- CreateTable
CREATE TABLE `tournaments` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('LEAGUE', 'CUP') NOT NULL,

    UNIQUE INDEX `tournaments_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `seasons` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `tournamentId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `seasons_name_tournamentId_key`(`name`, `tournamentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teams` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `shortName` VARCHAR(4) NOT NULL,

    UNIQUE INDEX `teams_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `matches` (
    `id` VARCHAR(191) NOT NULL,
    `seasonId` VARCHAR(191) NOT NULL,
    `kickOff` TIMESTAMP NOT NULL,
    `extraTime` BOOLEAN NOT NULL,
    `penaltyShootout` BOOLEAN NOT NULL,
    `tournamentId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `match-teams` (
    `id` VARCHAR(191) NOT NULL,
    `matchId` VARCHAR(191) NOT NULL,
    `teamId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `match-teams_matchId_teamId_key`(`matchId`, `teamId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `match-events` (
    `id` VARCHAR(191) NOT NULL,
    `matchTeamId` VARCHAR(191) NOT NULL,
    `type` ENUM('GOAL', 'YELLOW_CARD', 'RED_CARD', 'SUBSTITUTION') NOT NULL,
    `minute` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `match-event-actors` (
    `id` VARCHAR(191) NOT NULL,
    `matchEventId` VARCHAR(191) NOT NULL,
    `player` VARCHAR(191) NOT NULL,
    `type` ENUM('SCORER', 'ASSIST', 'OG', 'CARD_TAKER', 'SUB_IN', 'SUB_OUT') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `seasons` ADD CONSTRAINT `seasons_tournamentId_fkey` FOREIGN KEY (`tournamentId`) REFERENCES `tournaments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `matches` ADD CONSTRAINT `matches_seasonId_fkey` FOREIGN KEY (`seasonId`) REFERENCES `seasons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `matches` ADD CONSTRAINT `matches_tournamentId_fkey` FOREIGN KEY (`tournamentId`) REFERENCES `tournaments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `match-teams` ADD CONSTRAINT `match-teams_matchId_fkey` FOREIGN KEY (`matchId`) REFERENCES `matches`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `match-teams` ADD CONSTRAINT `match-teams_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `teams`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `match-events` ADD CONSTRAINT `match-events_matchTeamId_fkey` FOREIGN KEY (`matchTeamId`) REFERENCES `match-teams`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `match-event-actors` ADD CONSTRAINT `match-event-actors_matchEventId_fkey` FOREIGN KEY (`matchEventId`) REFERENCES `match-events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

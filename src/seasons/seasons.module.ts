import { Module } from '@nestjs/common';
import { SeasonsService } from './seasons.service';
import { SeasonsController } from './seasons.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { TournamentsModule } from '../tournaments/tournaments.module';

@Module({
  imports: [PrismaModule, TournamentsModule],
  controllers: [SeasonsController],
  providers: [SeasonsService],
})
export class SeasonsModule {}

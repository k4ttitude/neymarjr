import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { MatchesModule } from './matches/matches.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { SeasonsModule } from './seasons/seasons.module';

@Module({
  imports: [PrismaModule, MatchesModule, TournamentsModule, SeasonsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

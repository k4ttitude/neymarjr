import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { MatchesModule } from './matches/matches.module';
import { TournamentsModule } from './tournaments/tournaments.module';

@Module({
  imports: [PrismaModule, MatchesModule, TournamentsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

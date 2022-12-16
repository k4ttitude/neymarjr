import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { SeasonsModule } from '../seasons/seasons.module';

@Module({
  imports: [PrismaModule, SeasonsModule],
  controllers: [MatchesController],
  providers: [MatchesService],
})
export class MatchesModule {}

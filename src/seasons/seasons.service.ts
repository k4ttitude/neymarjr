import { Injectable } from '@nestjs/common';
import { CrudService, Transaction } from '../prisma/crud.service';
import { PrismaService } from '../prisma/prisma.service';
import { TournamentsService } from '../tournaments/tournaments.service';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';
import { SeasonEntity } from './entities/season.entity';

@Injectable()
export class SeasonsService extends CrudService<
  SeasonEntity,
  CreateSeasonDto,
  UpdateSeasonDto
> {
  constructor(
    readonly prisma: PrismaService,
    private tournamentService: TournamentsService,
  ) {
    super('season', prisma);
  }

  create(
    createSeasonDto: CreateSeasonDto,
    transaction?: Transaction,
  ): Promise<SeasonEntity> {
    return super.runInTransaction(async (prisma) => {
      await this.tournamentService.findOne(
        createSeasonDto.tournamentId,
        prisma,
      ); // verify that the tournament exists
      return super.create(createSeasonDto, prisma);
    }, transaction);
  }

  update(
    id: string,
    updateSeasonDto: UpdateSeasonDto,
    transaction?: Transaction,
  ): Promise<SeasonEntity> {
    return this.runInTransaction(async (prisma) => {
      if (updateSeasonDto.tournamentId) {
        await this.tournamentService.findOne(
          updateSeasonDto.tournamentId,
          prisma,
        );
      } // verify that the tournament exists
      return super.update(id, updateSeasonDto, prisma);
    }, transaction);
  }
}

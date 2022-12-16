import { Injectable } from '@nestjs/common';
import { CrudService, Transaction } from '../prisma/crud.service';
import { PrismaService } from '../prisma/prisma.service';
import { SeasonsService } from '../seasons/seasons.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { MatchEntity } from './entities/match.entity';

@Injectable()
export class MatchesService extends CrudService<
  MatchEntity,
  CreateMatchDto,
  UpdateMatchDto
> {
  constructor(
    private prismaService: PrismaService,
    private seasonService: SeasonsService,
  ) {
    super('match', prismaService);
  }

  create(
    createMatchDto: CreateMatchDto,
    transaction?: Transaction,
  ): Promise<MatchEntity> {
    console.log(createMatchDto.extraTime, typeof createMatchDto.extraTime);
    return super.runInTransaction(async (prisma) => {
      await this.seasonService.findOne(createMatchDto.seasonId, prisma);
      return super.create(createMatchDto, prisma);
    }, transaction);
  }

  // findAll(): Promise<MatchEntity[]> {
  //   return this.prismaService.match.findMany();
  // }

  // findOne(id: string): Promise<MatchEntity> {
  //   return this.prismaService.match.findUnique({ where: { id } });
  // }

  update(
    id: string,
    updateMatchDto: UpdateMatchDto,
    transaction?: Transaction,
  ): Promise<MatchEntity> {
    return super.runInTransaction(async (prisma) => {
      if (updateMatchDto.seasonId) {
        await this.seasonService.findOne(updateMatchDto.seasonId, prisma);
      }
      return super.update(id, updateMatchDto, prisma);
    }, transaction);
  }

  // remove(id: string): Promise<MatchEntity> {
  //   return this.prismaService.match.delete({ where: { id } });
  // }
}

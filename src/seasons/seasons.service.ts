import { Injectable } from '@nestjs/common';
import { CrudService } from '../prisma/crud.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';
import { SeasonEntity } from './entities/season.entity';

@Injectable()
export class SeasonsService extends CrudService<
  SeasonEntity,
  CreateSeasonDto,
  UpdateSeasonDto
> {
  constructor(readonly prisma: PrismaService) {
    super('season', prisma);
  }
}

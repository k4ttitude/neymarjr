import { Injectable } from '@nestjs/common';
import { CrudService } from '../prisma/crud.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { TournamentEntity } from './entities/tournament.entity';

@Injectable()
export class TournamentsService extends CrudService<
  TournamentEntity,
  CreateTournamentDto,
  UpdateTournamentDto
> {
  constructor(private prismaService: PrismaService) {
    super('tournament', prismaService);
  }
}

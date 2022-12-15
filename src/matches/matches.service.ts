import { Injectable } from '@nestjs/common';
import { CrudService } from '../prisma/crud.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { MatchEntity } from './entities/match.entity';

@Injectable()
export class MatchesService extends CrudService<
  MatchEntity,
  CreateMatchDto,
  UpdateMatchDto
> {
  constructor(private prismaService: PrismaService) {
    super('match', prismaService);
  }

  // findAll(): Promise<MatchEntity[]> {
  //   return this.prismaService.match.findMany();
  // }

  // findOne(id: string): Promise<MatchEntity> {
  //   return this.prismaService.match.findUnique({ where: { id } });
  // }

  // update(id: string, updateMatchDto: UpdateMatchDto): Promise<MatchEntity> {
  //   return this.prismaService.match.update({
  //     where: { id },
  //     data: updateMatchDto,
  //   });
  // }

  // remove(id: string): Promise<MatchEntity> {
  //   return this.prismaService.match.delete({ where: { id } });
  // }
}

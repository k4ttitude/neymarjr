import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { MatchEntity } from './entities/match.entity';

@Injectable()
export class MatchesService {
  constructor(private prismaService: PrismaService) {}

  create(createMatchDto: CreateMatchDto): Promise<MatchEntity> {
    return this.prismaService.match.create({ data: createMatchDto });
  }

  findAll(): Promise<MatchEntity[]> {
    return this.prismaService.match.findMany();
  }

  findOne(id: string): Promise<MatchEntity> {
    return this.prismaService.match.findUnique({ where: { id } });
  }

  update(id: string, updateMatchDto: UpdateMatchDto): Promise<MatchEntity> {
    return this.prismaService.match.update({
      where: { id },
      data: updateMatchDto,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prismaService.match.delete({ where: { id } });
  }
}

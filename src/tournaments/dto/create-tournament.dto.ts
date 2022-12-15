import { ApiProperty } from '@nestjs/swagger';
import { TournamentType } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';
import { TournamentEntity } from '../entities/tournament.entity';

export class CreateTournamentDto implements Omit<TournamentEntity, 'id'> {
  @IsString()
  name: string;

  @IsEnum(TournamentType)
  @ApiProperty({ enum: TournamentType })
  type: TournamentType;
}

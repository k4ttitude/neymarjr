import { ApiProperty } from '@nestjs/swagger';
import { TournamentType, type Tournament } from '@prisma/client';

export class TournamentEntity implements Tournament {
  id: string;
  name: string;

  @ApiProperty({ enum: TournamentType })
  type: TournamentType;
}

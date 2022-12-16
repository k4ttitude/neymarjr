import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { ValuesOf } from '../../types/ValuesOf';

const MatchOrderBy = {
  kickOff: 'kickOff',
} as const;

type MatchOrderBy = ValuesOf<typeof MatchOrderBy>;

export class FindMatchesArgs {
  @IsOptional()
  @IsDateString()
  from?: Date;

  @IsOptional()
  @IsDateString()
  to?: Date;

  @IsOptional()
  @IsString()
  @IsEnum(MatchOrderBy)
  @ApiProperty({ enum: MatchOrderBy })
  orderBy?: MatchOrderBy;

  @IsOptional()
  @IsString()
  seasonId?: string;
}

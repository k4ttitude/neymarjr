import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';
import { MatchEntity } from '../entities/match.entity';

export class CreateMatchDto implements Omit<MatchEntity, 'id'> {
  @IsString()
  seasonId: string;

  @IsOptional()
  @IsDateString()
  kickOff: Date | null;

  @IsOptional()
  @IsBoolean()
  extraTime: boolean | null;

  @IsOptional()
  @IsBoolean()
  penaltyShootout: boolean | null;
}

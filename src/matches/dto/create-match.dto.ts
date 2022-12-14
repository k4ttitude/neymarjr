import { IsBoolean, IsDateString, IsString } from 'class-validator';
import { MatchEntity } from '../entities/match.entity';

export class CreateMatchDto implements Omit<MatchEntity, 'id'> {
  @IsString()
  tournamentId: string;

  @IsDateString()
  kickOff: Date;

  @IsBoolean()
  extraTime: boolean;

  @IsBoolean()
  penaltyShootout: boolean;
}

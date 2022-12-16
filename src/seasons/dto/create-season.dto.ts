import { IsString } from 'class-validator';
import { SeasonEntity } from '../entities/season.entity';

export class CreateSeasonDto implements Omit<SeasonEntity, 'id'> {
  @IsString()
  name: string;

  @IsString()
  tournamentId: string;
}

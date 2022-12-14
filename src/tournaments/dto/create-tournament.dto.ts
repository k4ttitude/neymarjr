import { IsString } from 'class-validator';
import { TournamentEntity } from '../entities/tournament.entity';

export class CreateTournamentDto implements Omit<TournamentEntity, 'id'> {
  @IsString()
  name: string;

  @IsString()
  type: string;
}

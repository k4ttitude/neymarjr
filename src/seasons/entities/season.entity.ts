import { Season } from '@prisma/client';

export class SeasonEntity implements Season {
  id: string;
  name: string;
  tournamentId: string;
}

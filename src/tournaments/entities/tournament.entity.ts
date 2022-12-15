import { Tournament } from '@prisma/client';

export class TournamentEntity implements Tournament {
  id: string;
  name: string;
  type: string;
}

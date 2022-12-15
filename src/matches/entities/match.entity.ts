import { Match } from '@prisma/client';

export class MatchEntity implements Match {
  id: string;
  seasonId: string;
  kickOff: Date;
  extraTime: boolean;
  penaltyShootout: boolean;
}

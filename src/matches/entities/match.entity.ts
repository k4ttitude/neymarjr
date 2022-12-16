import { Match } from '@prisma/client';

export class MatchEntity implements Match {
  id: string;
  seasonId: string;
  kickOff: Date | null;
  extraTime: boolean | null;
  penaltyShootout: boolean | null;
}

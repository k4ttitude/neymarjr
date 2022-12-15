import { open } from 'fs/promises';
import { join } from 'path';
import { parse } from 'date-fns';
import { parse as csvParse } from 'csv-parse';
import { Match, Team } from '@prisma/client';

const TEAMS_CSV = join(__dirname, 'teams.csv');
type TeamRecord = Pick<Team, 'name' | 'shortName'>;
export const getTeams = () =>
  new Promise<TeamRecord[]>(async (resolve, reject) => {
    const records: TeamRecord[] = [];
    const fd = await open(TEAMS_CSV);
    fd.createReadStream()
      .pipe(csvParse({ delimiter: ',', fromLine: 2 }))
      .on('data', ([shortName, name]) => records.push({ shortName, name }))
      .on('end', () => resolve(records))
      .on('error', reject);
  });

const MATCHES_CSV = join(__dirname, 'matches.csv');
type MatchRecord = Pick<Match, 'kickOff'> & { home: string; away: string };
export const getMatches = (teams: Team[]) =>
  new Promise<MatchRecord[]>(async (resolve, reject) => {
    const teamsMap = teams.reduce(
      (map, team) => ({ ...map, [team.name]: team.id }),
      {} as Record<string, string>,
    );

    const records = [] as MatchRecord[];
    const fd = await open(MATCHES_CSV);
    fd.createReadStream()
      .pipe(csvParse({ delimiter: ',', fromLine: 2 }))
      .on('data', (row) => {
        const [date, time, homeName, awayName] = row;
        const home = teamsMap[homeName];
        const away = teamsMap[awayName];
        if (!home || !away) return;

        const kickOff = parse(
          `${date} ${time} +00`,
          'yyyy-MM-dd hh:mm:ss a x',
          new Date(),
        );
        records.push({ kickOff, home, away });
      })
      .on('end', () => resolve(records))
      .on('error', reject);
  });

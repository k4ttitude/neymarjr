import { PrismaClient, type Tournament, TournamentType } from '@prisma/client';
import { getMatches, getTeams } from './seed.data';

const prisma = new PrismaClient();

const TOURNAMENTS: Pick<Tournament, 'name' | 'type'>[] = [
  {
    name: 'Premier League',
    type: TournamentType.LEAGUE,
  },
  {
    name: 'LaLiga',
    type: TournamentType.LEAGUE,
  },
];

async function main() {
  // seed tournaments
  const tournaments = await Promise.all(
    TOURNAMENTS.map((item) =>
      prisma.tournament.upsert({
        where: { name: item.name },
        update: {},
        create: item,
      }),
    ),
  );

  // seed seasons
  const seasonName = '2021-2022';
  const seasons = await Promise.all(
    tournaments.map((tour) =>
      prisma.season.upsert({
        where: {
          name_tournamentId: { name: seasonName, tournamentId: tour.id },
        },
        update: {},
        create: { name: seasonName, tournamentId: tour.id },
      }),
    ),
  );

  // seed teams
  const EPL_TEAMS = await getTeams();
  const teams = await Promise.all(
    EPL_TEAMS.map((item) =>
      prisma.team.upsert({
        where: { name: item.name },
        update: {},
        create: item,
      }),
    ),
  );

  // seed matches
  await prisma.match.deleteMany({ where: { seasonId: seasons[0].id } });
  const EPL_MATCHES = await getMatches(teams);
  const matches = await Promise.all(
    EPL_MATCHES.map((match) =>
      prisma.match.upsert({
        where: { id: '' },
        update: {},
        create: {
          seasonId: seasons[0].id,
          kickOff: match.kickOff,
          matchTeams: {
            createMany: {
              data: [
                { teamId: match.home, isHome: true },
                { teamId: match.away },
              ],
            },
          },
        },
      }),
    ),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

import {
  MatchEventActorType,
  MatchEventType,
  PrismaClient,
  Team,
  Tournament,
  TournamentType,
} from '@prisma/client';

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

const EPL_TEAMS: Pick<Team, 'name' | 'shortName'>[] = [
  {
    name: 'Arsenal',
    shortName: 'ARS',
  },
  {
    name: 'Manchester City',
    shortName: 'MCI',
  },
  {
    name: 'Tottenham Hotspur',
    shortName: 'TOT',
  },
  {
    name: 'Chelsea',
    shortName: 'CHE',
  },
  {
    name: 'Liverpool',
    shortName: 'LIV',
  },
  {
    name: 'Manchester United',
    shortName: 'MUN',
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
  const matches = await Promise.all(
    Array.from({ length: teams.length / 2 }).map(() =>
      prisma.match.upsert({
        where: { id: '' },
        update: {},
        create: {
          seasonId: seasons[0].id,
          kickOff: new Date(),
        },
      }),
    ),
  );

  // seed match-teams
  const matchTeams = (
    await Promise.all(
      matches.map((item, index) =>
        Promise.all([
          // first team
          prisma.matchTeam.upsert({
            where: { id: '' },
            update: {},
            create: {
              matchId: item.id,
              teamId: teams[index * 2].id,
            },
          }),
          // second team
          prisma.matchTeam.upsert({
            where: { id: '' },
            update: {},
            create: {
              matchId: item.id,
              teamId: teams[index * 2 + 1].id,
            },
          }),
        ]),
      ),
    )
  ).flat();

  // seed match-events
  const matchEvents = (
    await Promise.all(
      matchTeams.map((item) =>
        Promise.all([
          // goal
          prisma.matchEvent.upsert({
            where: { id: '' },
            update: {},
            create: {
              minute: 20,
              type: MatchEventType.GOAL,
              matchTeamId: item.id,
            },
          }),
          // yellow card
          prisma.matchEvent.upsert({
            where: { id: '' },
            update: {},
            create: {
              minute: 50,
              type: MatchEventType.YELLOW_CARD,
              matchTeamId: item.id,
            },
          }),
        ]),
      ),
    )
  ).flat();

  // seed match-event-actor
  await Promise.all(
    matchEvents.map((item) =>
      Promise.all([
        prisma.matchEventActor.upsert({
          where: { id: '' },
          update: {},
          create: {
            player: 'Player 1',
            type:
              item.type === MatchEventType.YELLOW_CARD
                ? MatchEventActorType.CARD_TAKER
                : MatchEventActorType.SCORER,
            matchEventId: item.id,
          },
        }),
        // if has goal event => create assist
        ...(item.type === MatchEventType.GOAL
          ? [
              prisma.matchEventActor.upsert({
                where: { id: '' },
                update: {},
                create: {
                  player: 'Player 2',
                  type: MatchEventActorType.ASSIST,
                  matchEventId: item.id,
                },
              }),
            ]
          : []),
      ]),
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

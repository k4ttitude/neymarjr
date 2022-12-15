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
  //   {
  //     name: 'Laliga',
  //     type: TournamentType.TOURNAMENT,
  //   },
];

const TEAMS: Pick<Team, 'name' | 'shortName'>[] = [
  {
    name: 'Arsenal',
    shortName: 'ARS',
  },
  {
    name: 'Manchester City',
    shortName: 'MC',
  },
  {
    name: 'Tottenham Hotspur',
    shortName: 'Spur',
  },
  {
    name: 'Chelsea',
    shortName: 'Chel',
  },
  {
    name: 'Liverpool',
    shortName: 'Liv',
  },
  {
    name: 'Manchester United',
    shortName: 'MU',
  },
];

async function main() {
  // seed tournaments
  const tournaments = await Promise.all(
    TOURNAMENTS.map((item) =>
      prisma.tournament.upsert({
        where: { id: '' },
        update: {},
        create: item,
      }),
    ),
  );

  // seed teams
  const teams = await Promise.all(
    TEAMS.map((item) =>
      prisma.team.upsert({
        where: { id: '' },
        update: {},
        create: item,
      }),
    ),
  );

  // seed matches
  const matches = await Promise.all(
    [...Array(teams.length / 2).keys()].map(() =>
      prisma.match.upsert({
        where: { id: '' },
        update: {},
        create: {
          tournamentId: tournaments[0].id,
          extraTime: false,
          penaltyShootout: false,
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

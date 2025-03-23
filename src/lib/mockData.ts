
import { User, Match, Pool, League, LeaderboardEntry, Prediction, Transaction } from '@/types';

// Leagues
export const leagues: League[] = ['Premier League', 'La Liga', 'Bundesliga', 'Serie A'];

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'JohnDoe',
    email: 'john@example.com',
    wallet: 100,
    isAdmin: false,
    createdAt: new Date(2024, 0, 1).toISOString(),
  },
  {
    id: '2',
    username: 'JaneSmith',
    email: 'jane@example.com',
    wallet: 250,
    isAdmin: false,
    createdAt: new Date(2024, 0, 5).toISOString(),
  },
  {
    id: '3',
    username: 'AdminUser',
    email: 'admin@example.com',
    wallet: 1000,
    isAdmin: true,
    createdAt: new Date(2023, 11, 25).toISOString(),
  },
];

// Mock Matches
export const mockMatches: Match[] = [
  {
    id: 'm1',
    league: 'Premier League',
    homeTeam: 'Arsenal',
    awayTeam: 'Chelsea',
    homeTeamLogo: '/team-logos/arsenal.png',
    awayTeamLogo: '/team-logos/chelsea.png',
    matchTime: new Date(2025, 1, 25, 15, 0).toISOString(),
    status: 'upcoming',
  },
  {
    id: 'm2',
    league: 'Premier League',
    homeTeam: 'Liverpool',
    awayTeam: 'Man City',
    homeTeamLogo: '/team-logos/liverpool.png',
    awayTeamLogo: '/team-logos/mancity.png',
    matchTime: new Date(2025, 1, 25, 17, 30).toISOString(),
    status: 'upcoming',
  },
  {
    id: 'm3',
    league: 'Premier League',
    homeTeam: 'Man United',
    awayTeam: 'Tottenham',
    homeTeamLogo: '/team-logos/manunited.png',
    awayTeamLogo: '/team-logos/tottenham.png',
    matchTime: new Date(2025, 1, 26, 14, 0).toISOString(),
    status: 'upcoming',
  },
  {
    id: 'm4',
    league: 'Premier League',
    homeTeam: 'Newcastle',
    awayTeam: 'Aston Villa',
    homeTeamLogo: '/team-logos/newcastle.png',
    awayTeamLogo: '/team-logos/astonvilla.png',
    matchTime: new Date(2025, 1, 26, 16, 30).toISOString(),
    status: 'upcoming',
  },
  {
    id: 'm5',
    league: 'Premier League',
    homeTeam: 'Brighton',
    awayTeam: 'Everton',
    homeTeamLogo: '/team-logos/brighton.png',
    awayTeamLogo: '/team-logos/everton.png',
    matchTime: new Date(2025, 1, 27, 20, 0).toISOString(),
    status: 'upcoming',
  },
  // LaLiga Matches
  {
    id: 'm6',
    league: 'La Liga',
    homeTeam: 'Barcelona',
    awayTeam: 'Real Madrid',
    homeTeamLogo: '/team-logos/barcelona.png',
    awayTeamLogo: '/team-logos/realmadrid.png',
    matchTime: new Date(2025, 1, 25, 20, 0).toISOString(),
    status: 'upcoming',
  },
  {
    id: 'm7',
    league: 'La Liga',
    homeTeam: 'Atletico Madrid',
    awayTeam: 'Sevilla',
    homeTeamLogo: '/team-logos/atletico.png',
    awayTeamLogo: '/team-logos/sevilla.png',
    matchTime: new Date(2025, 1, 26, 18, 0).toISOString(),
    status: 'upcoming',
  },
  {
    id: 'm8',
    league: 'La Liga',
    homeTeam: 'Real Sociedad',
    awayTeam: 'Valencia',
    homeTeamLogo: '/team-logos/realsociedad.png',
    awayTeamLogo: '/team-logos/valencia.png',
    matchTime: new Date(2025, 1, 26, 14, 0).toISOString(),
    status: 'upcoming',
  },
  {
    id: 'm9',
    league: 'La Liga',
    homeTeam: 'Villarreal',
    awayTeam: 'Athletic Bilbao',
    homeTeamLogo: '/team-logos/villarreal.png',
    awayTeamLogo: '/team-logos/bilbao.png',
    matchTime: new Date(2025, 1, 27, 16, 0).toISOString(),
    status: 'upcoming',
  },
  {
    id: 'm10',
    league: 'La Liga',
    homeTeam: 'Real Betis',
    awayTeam: 'Espanyol',
    homeTeamLogo: '/team-logos/betis.png',
    awayTeamLogo: '/team-logos/espanyol.png',
    matchTime: new Date(2025, 1, 27, 21, 0).toISOString(),
    status: 'upcoming',
  },
];

// Mock Pools
export const mockPools: Pool[] = [
  {
    id: 'p1',
    name: 'Premier League Week 26',
    league: 'Premier League',
    matches: mockMatches.filter(match => match.league === 'Premier League').slice(0, 5),
    entryFee: 10,
    jackpot: 1000,
    startDate: new Date(2025, 1, 25).toISOString(),
    endDate: new Date(2025, 1, 27).toISOString(),
    status: 'upcoming',
  },
  {
    id: 'p2',
    name: 'La Liga Week 24',
    league: 'La Liga',
    matches: mockMatches.filter(match => match.league === 'La Liga').slice(0, 5),
    entryFee: 10,
    jackpot: 850,
    startDate: new Date(2025, 1, 25).toISOString(),
    endDate: new Date(2025, 1, 27).toISOString(),
    status: 'upcoming',
  },
];

// Mock Leaderboard
export const mockLeaderboard: LeaderboardEntry[] = [
  {
    userId: '1',
    username: 'JohnDoe',
    points: 18,
    correctScores: 2,
    correctOutcomes: 3,
    correctTies: 1,
    rank: 1,
  },
  {
    userId: '2',
    username: 'JaneSmith',
    points: 15,
    correctScores: 1,
    correctOutcomes: 4,
    correctTies: 2,
    rank: 2,
  },
  {
    userId: '4',
    username: 'MikeBrown',
    points: 12,
    correctScores: 1,
    correctOutcomes: 3,
    correctTies: 1,
    rank: 3,
  },
  {
    userId: '5',
    username: 'SarahJones',
    points: 10,
    correctScores: 0,
    correctOutcomes: 5,
    correctTies: 0,
    rank: 4,
  },
  {
    userId: '6',
    username: 'RobertWilson',
    points: 8,
    correctScores: 0,
    correctOutcomes: 4,
    correctTies: 0,
    rank: 5,
  },
];

// Mock Predictions
export const mockPredictions: Prediction[] = [
  {
    id: 'pred1',
    userId: '1',
    matchId: 'm1',
    homeScore: 2,
    awayScore: 1,
    createdAt: new Date(2025, 1, 24).toISOString(),
  },
  {
    id: 'pred2',
    userId: '1',
    matchId: 'm2',
    homeScore: 1,
    awayScore: 1,
    createdAt: new Date(2025, 1, 24).toISOString(),
  },
  {
    id: 'pred3',
    userId: '2',
    matchId: 'm1',
    homeScore: 1,
    awayScore: 2,
    createdAt: new Date(2025, 1, 24).toISOString(),
  },
];

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: 't1',
    userId: '1',
    amount: 50,
    type: 'deposit',
    status: 'completed',
    description: 'Initial deposit',
    createdAt: new Date(2025, 1, 20).toISOString(),
  },
  {
    id: 't2',
    userId: '1',
    amount: -10,
    type: 'fee',
    status: 'completed',
    description: 'Premier League Week 26 entry fee',
    createdAt: new Date(2025, 1, 24).toISOString(),
  },
  {
    id: 't3',
    userId: '2',
    amount: 100,
    type: 'deposit',
    status: 'completed',
    description: 'Initial deposit',
    createdAt: new Date(2025, 1, 22).toISOString(),
  },
  {
    id: 't4',
    userId: '2',
    amount: -10,
    type: 'fee',
    status: 'completed',
    description: 'Premier League Week 26 entry fee',
    createdAt: new Date(2025, 1, 24).toISOString(),
  },
];

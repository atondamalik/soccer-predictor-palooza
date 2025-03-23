
export interface User {
  id: string;
  username: string;
  email: string;
  wallet: number;
  isAdmin: boolean;
  createdAt: string;
}

export interface Match {
  id: string;
  league: League;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo?: string;
  awayTeamLogo?: string;
  matchTime: string;
  status: 'upcoming' | 'live' | 'finished';
  result?: {
    homeScore: number;
    awayScore: number;
  };
}

export interface Prediction {
  id: string;
  userId: string;
  matchId: string;
  homeScore: number;
  awayScore: number;
  points?: number;
  createdAt: string;
}

export interface Pool {
  id: string;
  name: string;
  league: League;
  matches: Match[];
  entryFee: number;
  jackpot: number;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'completed';
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  points: number;
  correctScores: number;
  correctOutcomes: number;
  correctTies: number;
  rank?: number;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'fee' | 'payout';
  status: 'pending' | 'completed' | 'failed';
  description: string;
  createdAt: string;
}

export type League = 'Premier League' | 'La Liga' | 'Bundesliga' | 'Serie A';

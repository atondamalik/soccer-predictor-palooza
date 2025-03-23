
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { League, Match, Prediction } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string, showTime = false): string {
  const date = new Date(dateString);
  
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  
  if (showTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }
  
  return new Intl.DateTimeFormat('en-GB', options).format(date);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function getLeagueColor(league: League): string {
  switch (league) {
    case 'Premier League':
      return 'bg-purple-600';
    case 'La Liga':
      return 'bg-red-600';
    case 'Bundesliga':
      return 'bg-yellow-600';
    case 'Serie A':
      return 'bg-blue-600';
    default:
      return 'bg-gray-600';
  }
}

export function getLeagueTextColor(league: League): string {
  switch (league) {
    case 'Premier League':
      return 'text-purple-600';
    case 'La Liga':
      return 'text-red-600';
    case 'Bundesliga':
      return 'text-yellow-600';
    case 'Serie A':
      return 'text-blue-600';
    default:
      return 'text-gray-600';
  }
}

export function calculatePoints(prediction: Prediction, match: Match): number {
  if (!match.result) return 0;
  
  const { homeScore, awayScore } = prediction;
  const { homeScore: actualHomeScore, awayScore: actualAwayScore } = match.result;
  
  // Correct Score: 5 points
  if (homeScore === actualHomeScore && awayScore === actualAwayScore) {
    return 5;
  }
  
  // Calculate match outcomes
  const predictedOutcome = homeScore > awayScore ? 'home' : homeScore < awayScore ? 'away' : 'draw';
  const actualOutcome = actualHomeScore > actualAwayScore ? 'home' : actualHomeScore < actualAwayScore ? 'away' : 'draw';
  
  // Correct Tie Prediction (Different Score): 3 points
  if (predictedOutcome === 'draw' && actualOutcome === 'draw') {
    return 3;
  }
  
  // Correct Outcome (Win/Loss): 2 points
  if (predictedOutcome === actualOutcome) {
    return 2;
  }
  
  return 0;
}

export function getFormattedMatchTime(matchTime: string): string {
  const date = new Date(matchTime);
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true
  });
}

export function getFormattedMatchDate(matchTime: string): string {
  const date = new Date(matchTime);
  return date.toLocaleDateString('en-US', { 
    weekday: 'short',
    month: 'short', 
    day: 'numeric'
  });
}

export function getMatchStatus(match: Match): string {
  if (match.status === 'live') {
    return 'LIVE';
  }
  
  if (match.status === 'finished') {
    return 'FINAL';
  }
  
  return getFormattedMatchTime(match.matchTime);
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

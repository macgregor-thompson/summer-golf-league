export interface Team {
  id: number;
  captain: number | null; // playerId
  name: string;
  letter: string;
  color: string;
  points?: number;
  netPoints?: number;
  colorScheme?: string;
  rank?: number | string;
  weeklyPoints?: object;
  bonusPoints?: number;
  docId?: string;
  icon?: string;
  worstWeek?: number;
}

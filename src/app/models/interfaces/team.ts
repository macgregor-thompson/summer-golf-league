export interface Team {
  id: number;
  captain: number | null; // playerId
  name: string;
  color: string;
  points: number;
}

import { Nav } from '../models/nav';

export const ROUTES: Nav[] = [
  {
    path: '/',
    name: 'Home',
    exact: true
  },
  {
    path: '/rankings',
    name: 'Rankings',
    exact: true
  },
  {
    path: '/scores',
    name: 'Scores',
    exact: true
  },
  {
    path: '/rules',
    name: 'Rules',
    exact: true
  }/*,
  {
    path: '/score-editor',
    name: 'Score Editor',
    exact: true
  }*/

];

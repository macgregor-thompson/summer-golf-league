import { Nav } from '../models/nav';

export const ROUTES: Nav[] = [
  {
    path: '/',
    name: 'Home',
    exact: true
  },
  {
    path: '/scores',
    name: 'Scores',
    exact: true
  },
  {
    path: '/rankings',
    name: 'Rankings',
    exact: true
  }
  /* ,{
     link: '/oops',
     name: '404',
     exact: false
   }*/

];

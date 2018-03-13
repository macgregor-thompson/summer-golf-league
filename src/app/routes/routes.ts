import { Routes } from '@angular/router';

import { RankingsComponent } from '../components/rankings/rankings.component';
import { RulesComponent } from '../components/rules/rules.component';
import { LoginComponent } from '../components/login/login.component';
import { PlayerDashboardComponent } from '../components/player-dashboard/player-dashboard.component';
import { ScoreEditorComponent } from '../components/score-editor/score-editor.component';
import { ScoresComponent } from '../components/scores/scores.component';
import { MainDashboardComponent } from '../components/main-dashboard/main-dashboard.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { ScoreViewComponent } from '../components/score-view/score-view.component';
import { PlayersComponent } from '../components/players/players.component';
import {StatsDashboardComponent} from '../components/stats-dashboard/stats-dashboard.component';

export const ROUTES: Routes = [
  { path: '', component: MainDashboardComponent, pathMatch: 'full' },
  { path: 'scores', component: ScoresComponent, pathMatch: 'full' },
  { path: 'score/:id', component: ScoreViewComponent, pathMatch: 'full' },
  { path: 'scores/editor', component: ScoreEditorComponent, pathMatch: 'full' },
  { path: 'rankings', component: RankingsComponent, pathMatch: 'full' },
  { path: 'stats', component: StatsDashboardComponent, pathMatch: 'full' },
  { path: 'players', component: PlayersComponent, pathMatch: 'full' },
  { path: 'player/:id', component: PlayerDashboardComponent, pathMatch: 'full' },
  { path: 'rules', component: RulesComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

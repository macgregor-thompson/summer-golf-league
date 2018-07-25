import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatsDashboardComponent } from './stats/stats-dashboard/stats-dashboard.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { PlayersDashboardComponent } from './players/players-dashboard/players-dashboard.component';

import { ScoreEditorComponent } from './scores/score-editor/score-editor.component';
import { LoginComponent } from './core/login/login.component';
import { ScoresDashboardComponent } from './scores/scores-dashboard/scores-dashboard.component';
import { RankingsDashboardComponent } from './rankings/rankings-dashboard/rankings-dashboard.component';
import { ScorecardComponent } from './scores/scorecard/scorecard.component';
import { LeagueInfoComponent } from './info/league-info/league-info.component';

const routes: Routes = [
  { path: '', component: ScoresDashboardComponent },
  { path: 'rankings', component: RankingsDashboardComponent },
  { path: 'scores', component: ScoresDashboardComponent },
  { path: 'score-editor', component: ScoreEditorComponent },
  { path: 'score/:id', component: ScorecardComponent  },
  { path: 'stats', component: StatsDashboardComponent  },
  { path: 'players', component: PlayersDashboardComponent  },
 /* { path: 'player/:id', component: , pathMatch: 'full' },*/
  { path: 'league-info', component: LeagueInfoComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

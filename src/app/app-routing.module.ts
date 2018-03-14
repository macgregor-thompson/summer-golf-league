import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatsDashboardComponent } from './stats/stats-dashboard/stats-dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlayersDashboardComponent } from './players/players-dashboard/players-dashboard.component';

import { RulesComponent } from './rules/rules/rules.component';
import { ScoreEditorComponent } from './scores/score-editor/score-editor.component';
import { LoginComponent } from './components/login/login.component';
import { HomeDashboardComponent } from './home/home-dashboard/home-dashboard.component';
import { ScoresDashboardComponent } from './scores/scores-dashboard/scores-dashboard.component';
import { RankingsDashboardComponent } from './rankings/rankings-dashboard/rankings-dashboard.component';
import { ScorecardComponent } from './shared/scorecard/scorecard.component';

const routes: Routes = [
  /*{ path: '', loadChildren: 'app/home/home.module#HomeModule' },
  { path: 'rankings', loadChildren: 'app/rankings/rankings.module#RankingsModule' },
  { path: 'scores', loadChildren: 'app/scores/scores.module#ScoresModule' },*/
  { path: '', component: HomeDashboardComponent },
  { path: 'rankings', component: RankingsDashboardComponent },
  { path: 'scores', component: ScoresDashboardComponent },
  { path: 'editor', component: ScoreEditorComponent },
  { path: 'score/:id', component: ScorecardComponent  },
  { path: 'stats', component: StatsDashboardComponent  },
  { path: 'players', component: PlayersDashboardComponent  },
 /* { path: 'player/:id', component: , pathMatch: 'full' },*/
  { path: 'rules', component: RulesComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

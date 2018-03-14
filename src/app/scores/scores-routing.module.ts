import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScoresDashboardComponent } from './scores-dashboard/scores-dashboard.component';

const routes: Routes = [
  { path: '', component: ScoresDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScoresRoutingModule { }

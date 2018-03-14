import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RankingsDashboardComponent } from './rankings-dashboard/rankings-dashboard.component';

const routes: Routes = [
  { path: '', component: RankingsDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RankingsRoutingModule { }

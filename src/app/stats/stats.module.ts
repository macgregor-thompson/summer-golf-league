import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from '../app-material/app-material.module';
import { ANIMATION_TYPES, LoadingModule } from 'ngx-loading';
import { SharedModule } from '../shared/shared.module';

import { StatsRoutingModule } from './stats-routing.module';
import { StatsDashboardComponent } from './stats-dashboard/stats-dashboard.component';
import { PlayerStatsComponent } from './player-stats/player-stats.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  imports: [
    CommonModule,
    StatsRoutingModule,

    NgxChartsModule,

    //Common Modules
    SharedModule,
    AppMaterialModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.threeBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0.3)',
      primaryColour: '#ff4227',
      secondaryColour: '#ffffff',
      tertiaryColour: '#007bff'
    })
  ],
  declarations: [StatsDashboardComponent, PlayerStatsComponent]
})
export class StatsModule { }

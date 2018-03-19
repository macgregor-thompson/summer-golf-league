import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RankingsDashboardComponent } from './rankings-dashboard/rankings-dashboard.component';
import { ANIMATION_TYPES, LoadingModule } from 'ngx-loading';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,

    NgxChartsModule,
    // Angular Material
    MatFormFieldModule,
    MatSelectModule,

    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.threeBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0.3)',
      primaryColour: '#ff4227',
      secondaryColour: '#ffffff',
      tertiaryColour: '#007bff'
    })
  ],
  declarations: [RankingsDashboardComponent]
})
export class RankingsModule { }

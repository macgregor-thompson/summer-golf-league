import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from '../app-material/app-material.module';
import { ANIMATION_TYPES, LoadingModule } from 'ngx-loading';
import { SharedModule } from '../shared/shared.module';

import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    //Common Modules
    AppMaterialModule,
    LoadingModule.forRoot({
      // ANIMATION_TYPES:
      // chasingDots, circle, circleSwish, cubeGrid
      // doubleBounce, pulse, rectangleBounce
      // rotatingPlane, threeBounce, wanderingCubes
      animationType: ANIMATION_TYPES.threeBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0.3)', // make the backdrop invisible
      //backdropBorderRadius: '100px',
      primaryColour: '#ff4227',
      secondaryColour: '#ffffff',
      tertiaryColour: '#007bff'
    })
  ],
  declarations: [HomeDashboardComponent],
})
export class HomeModule {
}

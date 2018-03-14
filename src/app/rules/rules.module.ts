import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from '../app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { ANIMATION_TYPES, LoadingModule } from 'ngx-loading';

import { RulesRoutingModule } from './rules-routing.module';
import { RulesComponent } from './rules/rules.component';


@NgModule({
  imports: [
    CommonModule,
    RulesRoutingModule,

    //Common Modules
    SharedModule,
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
  declarations: [RulesComponent]
})
export class RulesModule { }

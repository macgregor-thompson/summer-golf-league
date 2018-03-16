import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { AppMaterialModule } from '../app-material/app-material.module';
import { ANIMATION_TYPES, LoadingModule } from 'ngx-loading';

import { ScoresDashboardComponent } from './scores-dashboard/scores-dashboard.component';
import { ScoreEditorComponent } from './score-editor/score-editor.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    //Common Modules
    AppMaterialModule,
    SharedModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.threeBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0.3)',
      primaryColour: '#ff4227',
      secondaryColour: '#ffffff',
      tertiaryColour: '#007bff'
    })
  ],
  declarations: [ScoresDashboardComponent, ScoreEditorComponent],
  exports: []
})
export class ScoresModule {}

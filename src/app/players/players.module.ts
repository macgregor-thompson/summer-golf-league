import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from '../app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { ANIMATION_TYPES, LoadingModule } from 'ngx-loading';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';

import { PlayersRoutingModule } from './players-routing.module';
import { PlayersDashboardComponent } from './players-dashboard/players-dashboard.component';
import { PlayerDialogModalComponent } from './player-dialog-modal/player-dialog-modal.component';
import { HandicapModalComponent } from './handicap-modal/handicap-modal.component';
import { PlayerEditorComponent } from './player-editor/player-editor.component';
import { HeckleSnackComponent } from './heckle-snack/heckle-snack.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GhinLookupWidgetComponent } from './ghin-lookup-widget/ghin-lookup-widget.component';


@NgModule({
  imports: [
    CommonModule,
    PlayersRoutingModule,
    AsyncLocalStorageModule,
    FormsModule, ReactiveFormsModule,

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
  declarations: [
    PlayersDashboardComponent, PlayerDialogModalComponent, HandicapModalComponent,
    PlayerEditorComponent, HeckleSnackComponent, GhinLookupWidgetComponent
  ],
  entryComponents: [
    HandicapModalComponent,
    PlayerDialogModalComponent
  ],
})
export class PlayersModule { }

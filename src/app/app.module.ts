// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// AngularFire
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material/app-material.module';

// Other
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';

// Custom
import { ROUTES} from './routes/routes';
import { AppComponent } from './app.component';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import { MockDataService } from './services/mock-data.service';
import { ScoreViewComponent } from './components/score-view/score-view.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ScoresComponent } from './components/scores/scores.component';
import { RankingsComponent } from './components/rankings/rankings.component';
import { PlayerDashboardComponent } from './components/player-dashboard/player-dashboard.component';
import { RulesComponent } from './components/rules/rules.component';
import { TeamChipComponent } from './components/team-chip/team-chip.component';
import { FilterRoundPipe } from './pipes/filter-round.pipe';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { ScoreToParPipe } from './pipes/score-to-par.pipe';
import { ScoreEditorComponent } from './components/score-editor/score-editor.component';
import { LoginComponent } from './components/login/login.component';
import { HandicapWidgetComponent } from './components/handicap-widget/handicap-widget.component';
import { SafePipe } from './pipes/safe.pipe';
import { PlayersComponent } from './components/players/players.component';
import { HandicapDialogModalComponent } from './components/handicap-dialog-modal/handicap-dialog-modal.component';
import { PlayerStatsComponent } from './components/player-stats/player-stats.component';
import { HeckleSnackComponent } from './components/heckle-snack/heckle-snack.component';
import { PlayerEditorComponent } from './components/player-editor/player-editor.component';
import { PlayerDialogModalComponent } from './components/player-dialog-modal/player-dialog-modal.component';
import { StatsDashboardComponent } from './components/stats-dashboard/stats-dashboard.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import {UserService} from './services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent, MainDashboardComponent, ScoreViewComponent, ScoresComponent, RankingsComponent,
    PlayerDashboardComponent, RulesComponent, TeamChipComponent, FilterRoundPipe, TopNavComponent,
    ScoreToParPipe, ScoreEditorComponent, LoginComponent, HandicapWidgetComponent,
    SafePipe, PlayersComponent, HandicapDialogModalComponent,
    PlayerStatsComponent,
    HeckleSnackComponent,
    PlayerEditorComponent,
    PlayerDialogModalComponent,
    StatsDashboardComponent,
    LoginModalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FormsModule, ReactiveFormsModule,

    // import HttpClientModule after BrowserModule
    HttpClientModule,
    BrowserAnimationsModule,

    // AngularFire
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features


    // Angular Material
    AppMaterialModule,

    NgxChartsModule,
    AsyncLocalStorageModule,

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
  providers: [MockDataService, UserService],
  entryComponents: [
    HandicapDialogModalComponent,
    PlayerDialogModalComponent,
    LoginModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

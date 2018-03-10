// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material/app-material.module';


import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { NgxChartsModule } from '@swimlane/ngx-charts';


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
import { ScoreComponent } from './components/score/score.component';
import { HandicapLookupComponent } from './components/handicap-lookup/handicap-lookup.component';
import { SafePipe } from './pipes/safe.pipe';
import { PlayersComponent } from './components/players/players.component';
import { PlayersDashboardComponent } from './components/players-dashboard/players-dashboard.component';
import { HandicapDialogModalComponent } from './components/handicap-dialog-modal/handicap-dialog-modal.component';
import { PlayerStatsComponent } from './components/player-stats/player-stats.component';
import { HeckleSnackComponent } from './components/heckle-snack/heckle-snack.component';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent, MainDashboardComponent, ScoreViewComponent, ScoresComponent, RankingsComponent,
    PlayerDashboardComponent, RulesComponent, TeamChipComponent, FilterRoundPipe, TopNavComponent,
    ScoreToParPipe, ScoreEditorComponent, LoginComponent, ScoreComponent, HandicapLookupComponent,
    SafePipe, PlayersComponent, PlayersDashboardComponent, HandicapDialogModalComponent,
    PlayerStatsComponent,
    HeckleSnackComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FormsModule, ReactiveFormsModule,

    // import HttpClientModule after BrowserModule
    HttpClientModule,
    BrowserAnimationsModule,

    // Angular Material
    AppMaterialModule,

    NgxChartsModule,

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
  providers: [MockDataService],
  bootstrap: [AppComponent]
})
export class AppModule {}

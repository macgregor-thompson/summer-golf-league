// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';


// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatList, MatTableModule, MatButtonModule, MatExpansionModule, MatIconModule,
  MatDatepickerModule, MatToolbar, MatToolbarModule, MatTabsModule, MatNativeDateModule, MatInputModule, MatCardModule,
  MatSelectModule, MatChipsModule, MatMenuModule
} from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';

import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';


// Custom
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


const routes: Routes = [
  { path: '', component: MainDashboardComponent, pathMatch: 'full' },
  { path: 'scores', component: ScoresComponent, pathMatch: 'full' },
  { path: 'score/:id', component: ScoreViewComponent, pathMatch: 'full' },
  { path: 'rankings', component: RankingsComponent, pathMatch: 'full' },
  { path: 'player/:id', component: PlayerDashboardComponent, pathMatch: 'full' },
  { path: 'rules', component: RulesComponent, pathMatch: 'full' },
  { path: 'score-editor', component: ScoreEditorComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    MainDashboardComponent,
    ScoreViewComponent,
    ScoresComponent,
    RankingsComponent,
    PlayerDashboardComponent,
    RulesComponent,
    TeamChipComponent,
    FilterRoundPipe,
    TopNavComponent,
    ScoreToParPipe,
    ScoreEditorComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatChipsModule,
    MatMenuModule,
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

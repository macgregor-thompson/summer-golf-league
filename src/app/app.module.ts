// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';


// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatList, MatTableModule, MatButtonModule, MatExpansionModule, MatIconModule,
  MatDatepickerModule, MatToolbar, MatToolbarModule, MatTabsModule, MatNativeDateModule, MatInputModule
} from '@angular/material';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';


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


const routes: Routes = [
  { path: '', component: MainDashboardComponent, pathMatch: 'full' },
  { path: 'scores', component: ScoresComponent, pathMatch: 'full' },
  { path: 'rankings', component: RankingsComponent, pathMatch: 'full' },
  { path: 'score/:id', component: ScoreViewComponent, pathMatch: 'full' },
  { path: 'player/:id', component: PlayerDashboardComponent, pathMatch: 'full' },
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
    RulesComponent
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
    MatTabsModule
  ],
  providers: [ MockDataService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}

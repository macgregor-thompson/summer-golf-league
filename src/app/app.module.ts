// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MockDataService } from './services/mock-data.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { LoginComponent } from './components/login/login.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import {UserService} from './services/user.service';
import { HomeModule } from './home/home.module';
import { ScoresModule } from './scores/scores.module';
import { RankingsModule } from './rankings/rankings.module';
import { SharedModule } from './shared/shared.module';
import { StatsModule } from './stats/stats.module';
import { PlayersModule } from './players/players.module';
import { RulesModule } from './rules/rules.module';
import { GolfersService } from './services/golfers.service';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    TopNavComponent,
    LoginComponent,
    LoginModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // import HttpClientModule after BrowserModule
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AppMaterialModule,

    // Feature Modules
    SharedModule,
   // AppRoutingModule,
    HomeModule,
    RankingsModule,
    ScoresModule,
    StatsModule,
    PlayersModule,
    RulesModule,

    NgxChartsModule,
    AsyncLocalStorageModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.threeBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0.3)', // make the backdrop invisible
      primaryColour: '#ff4227',
      secondaryColour: '#ffffff',
      tertiaryColour: '#007bff'
    })
  ],

  // These providers (injectables) are application scoped and all sub components/modules will share the same instance
  providers: [MockDataService, UserService, GolfersService],
  entryComponents: [
    LoginModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

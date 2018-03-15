// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

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
import { MockDataService } from './core/services/mock-data.service';
import {UserService} from './core/services/user.service';
import { HomeModule } from './home/home.module';
import { ScoresModule } from './scores/scores.module';
import { RankingsModule } from './rankings/rankings.module';
import { SharedModule } from './shared/shared.module';
import { StatsModule } from './stats/stats.module';
import { PlayersModule } from './players/players.module';
import { GolfersService } from './core/services/golfers.service';
import { CoreModule } from './core/core.module';
import { InfoModule } from './info/info.module';


@NgModule({
  declarations: [
    AppComponent,
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
    CoreModule,
    SharedModule,
   // AppRoutingModule,
    HomeModule,
    RankingsModule,
    ScoresModule,
    StatsModule,
    PlayersModule,
    InfoModule,
  ],
  // These providers (injectables) are application scoped and all sub components/modules will share the same instance
  bootstrap: [AppComponent]
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from '../app-material/app-material.module';

import { TopNavComponent } from './top-nav/top-nav.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { MockDataService } from './services/mock-data.service';
import { UserService } from './services/user.service';
import { GolfersService } from './services/golfers.service';
import { PlayerService } from './services/player.service';
import { AngularFireAuth } from 'angularfire2/auth';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    AppMaterialModule
  ],
  declarations: [TopNavComponent, NotFoundComponent, LoginModalComponent, LoginComponent],
  exports: [TopNavComponent],
  entryComponents: [
    LoginModalComponent
  ],
  providers: [MockDataService, UserService, GolfersService, PlayerService, AngularFireAuth],
})
export class CoreModule { }

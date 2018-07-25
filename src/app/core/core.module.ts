import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from '../app-material/app-material.module';

import { TopNavComponent } from './top-nav/top-nav.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { PlayerService } from './services/player.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { DataService } from './services/data.service';

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
  providers: [DataService, PlayerService, AngularFireAuth],
})
export class CoreModule { }

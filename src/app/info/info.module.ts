import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule, MatListModule } from '@angular/material';

import { InfoRoutingModule } from './info-routing.module';
import { LeagueInfoComponent } from './league-info/league-info.component';

@NgModule({
  imports: [
    CommonModule,
    InfoRoutingModule,

    MatListModule, MatIconModule

  ],
  declarations: [LeagueInfoComponent]
})
export class InfoModule { }

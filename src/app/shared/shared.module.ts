import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamChipComponent } from './team-chip/team-chip.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { TeamPipe } from './pipes/team.pipe';
import { FilterPlayersByTeamPipe } from './pipes/filter-players-by-team.pipe';


@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  declarations: [
    TeamChipComponent,
    TeamPipe,
    FilterPlayersByTeamPipe
  ],
  exports: [
    TeamChipComponent,
    TeamPipe,
    FilterPlayersByTeamPipe
  ],
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScorecardComponent } from './scorecard/scorecard.component';
import { FilterRoundPipe } from './pipes/filter-round.pipe';
import { TeamChipComponent } from './team-chip/team-chip.component';
import { AppMaterialModule } from '../app-material/app-material.module';


@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  declarations: [
    ScorecardComponent,
    FilterRoundPipe,
    TeamChipComponent
  ],
  exports: [
    ScorecardComponent,
    FilterRoundPipe,
    TeamChipComponent
  ],
})
export class SharedModule { }

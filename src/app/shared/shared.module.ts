import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterRoundPipe } from './pipes/filter-round.pipe';
import { TeamChipComponent } from './team-chip/team-chip.component';
import { AppMaterialModule } from '../app-material/app-material.module';


@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  declarations: [
    FilterRoundPipe,
    TeamChipComponent
  ],
  exports: [
    FilterRoundPipe,
    TeamChipComponent
  ],
})
export class SharedModule { }

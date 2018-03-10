import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MainDashboardComponent
  ],
  exports: [
    MainDashboardComponent
  ]
})
export class HomeModule { }

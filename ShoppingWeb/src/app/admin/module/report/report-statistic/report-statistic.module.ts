import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportStatisticRoutingModule } from './report-statistic-routing.module';
import { ReportStatisticComponent } from './report-statistic.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReportStatisticComponent
  ],
  imports: [
    CommonModule,
    ReportStatisticRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReportStatisticModule { }

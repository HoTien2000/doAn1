import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportStatisticComponent } from './report-statistic.component';

const routes: Routes = [{ path: '', component: ReportStatisticComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportStatisticRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewIntroductionComponent } from './view-introduction.component';

const routes: Routes = [{ path: '', component: ViewIntroductionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewIntroductionRoutingModule { }

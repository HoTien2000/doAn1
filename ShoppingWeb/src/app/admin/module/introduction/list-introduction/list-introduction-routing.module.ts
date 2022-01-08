import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListIntroductionComponent } from './list-introduction.component';

const routes: Routes = [{ path: '', component: ListIntroductionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListIntroductionRoutingModule { }

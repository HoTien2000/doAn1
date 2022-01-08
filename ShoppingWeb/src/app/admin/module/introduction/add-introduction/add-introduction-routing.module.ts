import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddIntroductionComponent } from './add-introduction.component';

const routes: Routes = [{ path: '', component: AddIntroductionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddIntroductionRoutingModule { }

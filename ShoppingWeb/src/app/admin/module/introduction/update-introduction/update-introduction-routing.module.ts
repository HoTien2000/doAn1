import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateIntroductionComponent } from './update-introduction.component';

const routes: Routes = [{ path: '', component: UpdateIntroductionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateIntroductionRoutingModule { }

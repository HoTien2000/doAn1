import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewNewsComponent } from './view-news.component';

const routes: Routes = [{ path: '', component: ViewNewsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewNewsRoutingModule { }

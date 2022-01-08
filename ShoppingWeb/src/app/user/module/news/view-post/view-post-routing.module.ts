import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPostComponent } from './view-post.component';

const routes: Routes = [{ path: '', component: ViewPostComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewPostRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTokenComponent } from './list-token.component';

const routes: Routes = [{ path: '', component: ListTokenComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListTokenRoutingModule { }

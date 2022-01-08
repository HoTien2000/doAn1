import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAdminComponent } from './main-admin.component';

const routes: Routes = [{ path: '', component: MainAdminComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainAdminRoutingModule { }

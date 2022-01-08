import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductTypeComponent } from './list-product-type.component';

const routes: Routes = [{ path: '', component: ListProductTypeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListProductTypeRoutingModule { }

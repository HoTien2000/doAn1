import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductTypeComponent } from './add-product-type.component';

const routes: Routes = [{ path: '', component: AddProductTypeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddProductTypeRoutingModule { }

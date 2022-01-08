import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateProductTypeComponent } from './update-product-type.component';

const routes: Routes = [{ path: '', component: UpdateProductTypeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateProductTypeRoutingModule { }

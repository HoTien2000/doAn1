import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateProductModelComponent } from './update-product-model.component';

const routes: Routes = [{ path: '', component: UpdateProductModelComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateProductModelRoutingModule { }

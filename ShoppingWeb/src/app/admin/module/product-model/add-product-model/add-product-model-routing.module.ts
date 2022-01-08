import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductModelComponent } from './add-product-model.component';

const routes: Routes = [{ path: '', component: AddProductModelComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddProductModelRoutingModule { }

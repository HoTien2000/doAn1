import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddShippingFeeComponent } from './add-shipping-fee.component';

const routes: Routes = [{ path: '', component: AddShippingFeeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddShippingFeeRoutingModule { }

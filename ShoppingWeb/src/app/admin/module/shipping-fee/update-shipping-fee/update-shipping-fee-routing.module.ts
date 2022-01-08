import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateShippingFeeComponent } from './update-shipping-fee.component';

const routes: Routes = [{ path: '', component: UpdateShippingFeeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateShippingFeeRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductPaymentComponent } from './product-payment.component';

const routes: Routes = [{ path: '', component: ProductPaymentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductPaymentRoutingModule { }

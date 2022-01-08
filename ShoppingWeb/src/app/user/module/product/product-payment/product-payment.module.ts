import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductPaymentRoutingModule } from './product-payment-routing.module';
import { ProductPaymentComponent } from './product-payment.component';
import { PaymentPipe } from './product-payment-pipe/payment-pipe';


@NgModule({
  declarations: [
    ProductPaymentComponent,
    PaymentPipe
  ],
  imports: [
    CommonModule,
    ProductPaymentRoutingModule
  ]
})
export class ProductPaymentModule { }

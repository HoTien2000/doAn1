import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListShippingFeeRoutingModule } from './list-shipping-fee-routing.module';
import { ListShippingFeeComponent } from './list-shipping-fee.component';


@NgModule({
  declarations: [
    ListShippingFeeComponent
  ],
  imports: [
    CommonModule,
    ListShippingFeeRoutingModule
  ]
})
export class ListShippingFeeModule { }

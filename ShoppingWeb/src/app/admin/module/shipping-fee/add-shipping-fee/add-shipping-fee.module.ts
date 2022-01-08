import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddShippingFeeRoutingModule } from './add-shipping-fee-routing.module';
import { AddShippingFeeComponent } from './add-shipping-fee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddShippingFeeComponent
  ],
  imports: [
    CommonModule,
    AddShippingFeeRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class AddShippingFeeModule { }

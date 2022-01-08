import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateShippingFeeRoutingModule } from './update-shipping-fee-routing.module';
import { UpdateShippingFeeComponent } from './update-shipping-fee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdateShippingFeeComponent
  ],
  imports: [
    CommonModule,
    UpdateShippingFeeRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class UpdateShippingFeeModule { }

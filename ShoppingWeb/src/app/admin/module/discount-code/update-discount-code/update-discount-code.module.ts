import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateDiscountCodeRoutingModule } from './update-discount-code-routing.module';
import { UpdateDiscountCodeComponent } from './update-discount-code.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdateDiscountCodeComponent
  ],
  imports: [
    CommonModule,
    UpdateDiscountCodeRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class UpdateDiscountCodeModule { }

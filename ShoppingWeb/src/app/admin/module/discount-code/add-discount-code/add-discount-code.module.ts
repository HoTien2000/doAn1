import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddDiscountCodeRoutingModule } from './add-discount-code-routing.module';
import { AddDiscountCodeComponent } from './add-discount-code.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddDiscountCodeComponent
  ],
  imports: [
    CommonModule,
    AddDiscountCodeRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class AddDiscountCodeModule { }

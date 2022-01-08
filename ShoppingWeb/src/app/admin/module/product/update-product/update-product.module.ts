import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateProductRoutingModule } from './update-product-routing.module';
import { UpdateProductComponent } from './update-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdateProductComponent
  ],
  imports: [
    CommonModule,
    UpdateProductRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class UpdateProductModule { }

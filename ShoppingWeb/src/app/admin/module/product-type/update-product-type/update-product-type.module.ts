import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateProductTypeRoutingModule } from './update-product-type-routing.module';
import { UpdateProductTypeComponent } from './update-product-type.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdateProductTypeComponent
  ],
  imports: [
    CommonModule,
    UpdateProductTypeRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class UpdateProductTypeModule { }

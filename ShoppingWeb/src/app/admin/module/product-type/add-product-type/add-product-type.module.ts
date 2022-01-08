import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProductTypeRoutingModule } from './add-product-type-routing.module';
import { AddProductTypeComponent } from './add-product-type.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddProductTypeComponent
  ],
  imports: [
    CommonModule,
    AddProductTypeRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class AddProductTypeModule { }

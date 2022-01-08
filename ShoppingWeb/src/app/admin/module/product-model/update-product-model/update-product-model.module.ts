import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateProductModelRoutingModule } from './update-product-model-routing.module';
import { UpdateProductModelComponent } from './update-product-model.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdateProductModelComponent
  ],
  imports: [
    CommonModule,
    UpdateProductModelRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class UpdateProductModelModule { }

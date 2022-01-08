import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProductModelRoutingModule } from './add-product-model-routing.module';
import { AddProductModelComponent } from './add-product-model.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddProductModelComponent
  ],
  imports: [
    CommonModule,
    AddProductModelRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class AddProductModelModule { }

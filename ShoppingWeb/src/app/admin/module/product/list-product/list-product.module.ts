import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListProductRoutingModule } from './list-product-routing.module';
import { ListProductComponent } from './list-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListProductComponent
  ],
  imports: [
    CommonModule,
    ListProductRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ListProductModule { }

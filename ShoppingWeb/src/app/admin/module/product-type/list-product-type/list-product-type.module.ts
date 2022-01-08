import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListProductTypeRoutingModule } from './list-product-type-routing.module';
import { ListProductTypeComponent } from './list-product-type.component';


@NgModule({
  declarations: [
    ListProductTypeComponent
  ],
  imports: [
    CommonModule,
    ListProductTypeRoutingModule
  ]
})
export class ListProductTypeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListProductModelRoutingModule } from './list-product-model-routing.module';
import { ListProductModelComponent } from './list-product-model.component';


@NgModule({
  declarations: [
    ListProductModelComponent
  ],
  imports: [
    CommonModule,
    ListProductModelRoutingModule
  ]
})
export class ListProductModelModule { }

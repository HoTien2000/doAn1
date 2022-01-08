import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductStatisticRoutingModule } from './product-statistic-routing.module';
import { ProductStatisticComponent } from './product-statistic.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductStatisticComponent
  ],
  imports: [
    CommonModule,
    ProductStatisticRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductStatisticModule { }

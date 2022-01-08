import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListDiscountCodeRoutingModule } from './list-discount-code-routing.module';
import { ListDiscountCodeComponent } from './list-discount-code.component';


@NgModule({
  declarations: [
    ListDiscountCodeComponent
  ],
  imports: [
    CommonModule,
    ListDiscountCodeRoutingModule
  ]
})
export class ListDiscountCodeModule { }

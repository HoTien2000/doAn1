import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyOrderRoutingModule } from './my-order-routing.module';
import { MyOrderComponent } from './my-order.component';


@NgModule({
  declarations: [
    MyOrderComponent
  ],
  imports: [
    CommonModule,
    MyOrderRoutingModule
  ]
})
export class MyOrderModule { }

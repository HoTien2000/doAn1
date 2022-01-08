import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductOrderRoutingModule } from './product-order-routing.module';
import { ProductOrderComponent } from './product-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderPipe } from './order-pipe/order-pipe';


@NgModule({
  declarations: [
    ProductOrderComponent,
    OrderPipe
  ],
  imports: [
    CommonModule,
    ProductOrderRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class ProductOrderModule { }

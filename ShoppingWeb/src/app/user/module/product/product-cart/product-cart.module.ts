import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCartRoutingModule } from './product-cart-routing.module';
import { ProductCartComponent } from './product-cart.component';
import { CartPipe } from './cart-pipe/cart-pipe';


@NgModule({
  declarations: [
    ProductCartComponent,
    CartPipe
  ],
  imports: [
    CommonModule,
    ProductCartRoutingModule
  ]
})
export class ProductCartModule { }

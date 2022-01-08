import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListOrderRoutingModule } from './list-order-routing.module';
import { ListOrderComponent } from './list-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListOrderComponent
  ],
  imports: [
    CommonModule,
    ListOrderRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ListOrderModule { }

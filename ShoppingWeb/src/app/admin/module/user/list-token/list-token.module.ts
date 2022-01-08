import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListTokenRoutingModule } from './list-token-routing.module';
import { ListTokenComponent } from './list-token.component';


@NgModule({
  declarations: [
    ListTokenComponent
  ],
  imports: [
    CommonModule,
    ListTokenRoutingModule
  ]
})
export class ListTokenModule { }

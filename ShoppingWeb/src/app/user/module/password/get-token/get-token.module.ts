import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GetTokenRoutingModule } from './get-token-routing.module';
import { GetTokenComponent } from './get-token.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GetTokenComponent
  ],
  imports: [
    CommonModule,
    GetTokenRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class GetTokenModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateIntroductionRoutingModule } from './update-introduction-routing.module';
import { UpdateIntroductionComponent } from './update-introduction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdateIntroductionComponent
  ],
  imports: [
    CommonModule,
    UpdateIntroductionRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class UpdateIntroductionModule { }

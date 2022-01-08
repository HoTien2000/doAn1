import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddIntroductionRoutingModule } from './add-introduction-routing.module';
import { AddIntroductionComponent } from './add-introduction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddIntroductionComponent
  ],
  imports: [
    CommonModule,
    AddIntroductionRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class AddIntroductionModule { }

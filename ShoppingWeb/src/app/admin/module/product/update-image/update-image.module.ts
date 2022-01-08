import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateImageRoutingModule } from './update-image-routing.module';
import { UpdateImageComponent } from './update-image.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdateImageComponent
  ],
  imports: [
    CommonModule,
    UpdateImageRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class UpdateImageModule { }

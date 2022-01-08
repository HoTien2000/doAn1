import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateNewsRoutingModule } from './update-news-routing.module';
import { UpdateNewsComponent } from './update-news.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdateNewsComponent
  ],
  imports: [
    CommonModule,
    UpdateNewsRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class UpdateNewsModule { }

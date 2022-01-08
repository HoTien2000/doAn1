import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddNewsRoutingModule } from './add-news-routing.module';
import { AddNewsComponent } from './add-news.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddNewsComponent
  ],
  imports: [
    CommonModule,
    AddNewsRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class AddNewsModule { }

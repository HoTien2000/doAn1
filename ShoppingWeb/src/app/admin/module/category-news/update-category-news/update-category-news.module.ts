import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateCategoryNewsRoutingModule } from './update-category-news-routing.module';
import { UpdateCategoryNewsComponent } from './update-category-news.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdateCategoryNewsComponent
  ],
  imports: [
    CommonModule,
    UpdateCategoryNewsRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class UpdateCategoryNewsModule { }

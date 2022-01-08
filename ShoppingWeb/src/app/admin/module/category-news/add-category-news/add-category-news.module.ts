import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCategoryNewsRoutingModule } from './add-category-news-routing.module';
import { AddCategoryNewsComponent } from './add-category-news.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddCategoryNewsComponent
  ],
  imports: [
    CommonModule,
    AddCategoryNewsRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class AddCategoryNewsModule { }

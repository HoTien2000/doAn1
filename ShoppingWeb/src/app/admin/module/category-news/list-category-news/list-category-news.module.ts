import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListCategoryNewsRoutingModule } from './list-category-news-routing.module';
import { ListCategoryNewsComponent } from './list-category-news.component';


@NgModule({
  declarations: [
    ListCategoryNewsComponent
  ],
  imports: [
    CommonModule,
    ListCategoryNewsRoutingModule
  ]
})
export class ListCategoryNewsModule { }

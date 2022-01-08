import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListCategoryRoutingModule } from './list-category-routing.module';
import { ListCategoryComponent } from './list-category.component';


@NgModule({
  declarations: [
    ListCategoryComponent
  ],
  imports: [
    CommonModule,
    ListCategoryRoutingModule
  ]
})
export class ListCategoryModule { }

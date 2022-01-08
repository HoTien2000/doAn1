import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCategoryRoutingModule } from './add-category-routing.module';
import { AddCategoryComponent } from './add-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddCategoryComponent
  ],
  imports: [
    CommonModule,
    AddCategoryRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class AddCategoryModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductReviewRoutingModule } from './product-review-routing.module';
import { ProductReviewComponent } from './product-review.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductReviewComponent
  ],
  imports: [
    CommonModule,
    ProductReviewRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class ProductReviewModule { }

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCategoryRoutingModule } from './product-category-routing.module';
import { ProductCategoryComponent } from './product-category.component';
import { ProductCategoryPipe } from './product-category-pipe/product-category-pipe';
import { Title } from '@angular/platform-browser';

@NgModule({
  declarations: [
    ProductCategoryComponent,
    ProductCategoryPipe
  ],
  imports: [
    CommonModule,
    ProductCategoryRoutingModule,
  ],
  providers: [
    Title
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductCategoryModule { }

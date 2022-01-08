import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchProductRoutingModule } from './search-product-routing.module';
import { SearchProductComponent } from './search-product.component';
import { SearchPipe } from './search-pipe/search-pipe';


@NgModule({
  declarations: [
    SearchProductComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    SearchProductRoutingModule
  ]
})
export class SearchProductModule { }

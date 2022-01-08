import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewNewsRoutingModule } from './view-news-routing.module';
import { ViewNewsComponent } from './view-news.component';


@NgModule({
  declarations: [
    ViewNewsComponent
  ],
  imports: [
    CommonModule,
    ViewNewsRoutingModule
  ]
})
export class ViewNewsModule { }

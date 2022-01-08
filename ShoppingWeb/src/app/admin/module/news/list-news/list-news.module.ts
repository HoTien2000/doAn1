import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListNewsRoutingModule } from './list-news-routing.module';
import { ListNewsComponent } from './list-news.component';


@NgModule({
  declarations: [
    ListNewsComponent
  ],
  imports: [
    CommonModule,
    ListNewsRoutingModule
  ]
})
export class ListNewsModule { }

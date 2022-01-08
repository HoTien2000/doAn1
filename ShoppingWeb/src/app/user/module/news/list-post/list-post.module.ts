import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListPostRoutingModule } from './list-post-routing.module';
import { ListPostComponent } from './list-post.component';
import { ListPostPipe } from './list-post-pipe/list-post-pipe';
import { Title } from '@angular/platform-browser';


@NgModule({
  declarations: [
    ListPostComponent,
    ListPostPipe
  ],
  providers: [
    Title
  ],
  imports: [
    CommonModule,
    ListPostRoutingModule
  ]
})
export class ListPostModule { }

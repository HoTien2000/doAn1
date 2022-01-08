import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewPostRoutingModule } from './view-post-routing.module';
import { ViewPostComponent } from './view-post.component';
import { ViewPostPipe } from './view-post-pipe/view-post-pipe';
import { Title } from '@angular/platform-browser';


@NgModule({
  declarations: [
    ViewPostComponent,
    ViewPostPipe
  ],
  providers: [
    Title
  ],
  imports: [
    CommonModule,
    ViewPostRoutingModule
  ]
})
export class ViewPostModule { }

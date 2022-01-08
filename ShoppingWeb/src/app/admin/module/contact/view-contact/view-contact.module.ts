import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewContactRoutingModule } from './view-contact-routing.module';
import { ViewContactComponent } from './view-contact.component';


@NgModule({
  declarations: [
    ViewContactComponent
  ],
  imports: [
    CommonModule,
    ViewContactRoutingModule
  ]
})
export class ViewContactModule { }

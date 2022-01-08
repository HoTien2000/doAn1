import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListContactRoutingModule } from './list-contact-routing.module';
import { ListContactComponent } from './list-contact.component';


@NgModule({
  declarations: [
    ListContactComponent
  ],
  imports: [
    CommonModule,
    ListContactRoutingModule
  ]
})
export class ListContactModule { }

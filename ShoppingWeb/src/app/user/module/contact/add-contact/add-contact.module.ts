import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddContactRoutingModule } from './add-contact-routing.module';
import { AddContactComponent } from './add-contact.component';
import { Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddContactComponent
  ],
  providers: [
    Title
  ],
  imports: [
    CommonModule,
    AddContactRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class AddContactModule { }

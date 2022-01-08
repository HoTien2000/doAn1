import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateUserRoutingModule } from './update-user-routing.module';
import { UpdateUserComponent } from './update-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdateUserComponent
  ],
  imports: [
    CommonModule,
    UpdateUserRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class UpdateUserModule { }

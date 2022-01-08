import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainAdminRoutingModule } from './main-admin-routing.module';
import { MainAdminComponent } from './main-admin.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    MainAdminComponent
  ],
  imports: [
    CommonModule,
    MainAdminRoutingModule,
    NgxSpinnerModule
  ]
})
export class MainAdminModule { }

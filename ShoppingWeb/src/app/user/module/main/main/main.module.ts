import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MainPipe } from './main-pipe/main-pipe';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    MainComponent,
    MainPipe
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainModule { }

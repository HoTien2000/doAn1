import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewIntroductionRoutingModule } from './view-introduction-routing.module';
import { ViewIntroductionComponent } from './view-introduction.component';
import { Title } from '@angular/platform-browser';


@NgModule({
  declarations: [
    ViewIntroductionComponent
  ],
  providers: [
    Title
  ],
  imports: [
    CommonModule,
    ViewIntroductionRoutingModule
  ]
})
export class ViewIntroductionModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListIntroductionRoutingModule } from './list-introduction-routing.module';
import { ListIntroductionComponent } from './list-introduction.component';


@NgModule({
  declarations: [
    ListIntroductionComponent
  ],
  imports: [
    CommonModule,
    ListIntroductionRoutingModule
  ]
})
export class ListIntroductionModule { }

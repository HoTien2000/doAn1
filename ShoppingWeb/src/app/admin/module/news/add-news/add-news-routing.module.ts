import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewsComponent } from './add-news.component';

const routes: Routes = [{ path: '', component: AddNewsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddNewsRoutingModule { }

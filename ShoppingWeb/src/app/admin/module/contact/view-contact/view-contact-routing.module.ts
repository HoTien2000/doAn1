import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewContactComponent } from './view-contact.component';

const routes: Routes = [{ path: '', component: ViewContactComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewContactRoutingModule { }

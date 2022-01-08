import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListContactComponent } from './list-contact.component';

const routes: Routes = [{ path: '', component: ListContactComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListContactRoutingModule { }

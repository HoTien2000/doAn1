import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDiscountCodeComponent } from './list-discount-code.component';

const routes: Routes = [{ path: '', component: ListDiscountCodeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListDiscountCodeRoutingModule { }

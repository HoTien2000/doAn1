import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDiscountCodeComponent } from './add-discount-code.component';

const routes: Routes = [{ path: '', component: AddDiscountCodeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddDiscountCodeRoutingModule { }

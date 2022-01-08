import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductStatisticComponent } from './product-statistic.component';

const routes: Routes = [{ path: '', component: ProductStatisticComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductStatisticRoutingModule { }

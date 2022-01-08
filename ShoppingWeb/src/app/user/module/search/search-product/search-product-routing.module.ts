import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchProductComponent } from './search-product.component';

const routes: Routes = [{ path: '', component: SearchProductComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchProductRoutingModule { }

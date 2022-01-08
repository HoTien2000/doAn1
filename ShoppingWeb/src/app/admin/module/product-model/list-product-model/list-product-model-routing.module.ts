import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductModelComponent } from './list-product-model.component';

const routes: Routes = [{ path: '', component: ListProductModelComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListProductModelRoutingModule { }

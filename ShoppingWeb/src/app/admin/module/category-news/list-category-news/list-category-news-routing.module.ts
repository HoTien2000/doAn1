import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoryNewsComponent } from './list-category-news.component';

const routes: Routes = [{ path: '', component: ListCategoryNewsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListCategoryNewsRoutingModule { }

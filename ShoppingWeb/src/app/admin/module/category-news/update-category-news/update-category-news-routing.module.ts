import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateCategoryNewsComponent } from './update-category-news.component';

const routes: Routes = [{ path: '', component: UpdateCategoryNewsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateCategoryNewsRoutingModule { }

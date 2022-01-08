import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateCategoryComponent } from './update-category.component';

const routes: Routes = [{ path: '', component: UpdateCategoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateCategoryRoutingModule { }

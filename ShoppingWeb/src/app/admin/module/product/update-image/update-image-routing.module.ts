import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateImageComponent } from './update-image.component';

const routes: Routes = [{ path: '', component: UpdateImageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateImageRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateNewsComponent } from './create-news.component';

const routes: Routes = [
  {
    path: '',
    component: CreateNewsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateNewsRoutingModule { }

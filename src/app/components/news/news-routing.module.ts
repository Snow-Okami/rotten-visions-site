import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsComponent } from './news.component';

const routes: Routes = [
  {
    path: '',
    component: NewsComponent
  },
  {
    path: 'create',
    loadChildren: '../create-news/create-news.module#CreateNewsModule'
  },
  {
    path: 'edit/:_id',
    loadChildren: '../edit-news/edit-news.module#EditNewsModule'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard/news'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }

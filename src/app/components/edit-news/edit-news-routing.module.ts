import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditNewsComponent } from './edit-news.component';

const routes: Routes = [
  {
    path: '',
    component: EditNewsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditNewsRoutingModule { }

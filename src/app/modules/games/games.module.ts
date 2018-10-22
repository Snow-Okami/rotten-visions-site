import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { TrimwordPipe } from '../../pipes/trimword.pipe';

import { GamesComponent } from '../../components/games/games.component';

export const routes: Routes = [
  { path: '', component: GamesComponent }
];

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    GamesComponent,
    TrimwordPipe
  ],
  providers: []
})
export class GamesModule { }


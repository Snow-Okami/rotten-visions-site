import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material';

/**
 * sudo npm i @angular/material-moment-adapter moment --save
 */
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatSidenavModule,
    MatGridListModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatDividerModule,
    MatTableModule
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatSidenavModule,
    MatGridListModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatDividerModule,
    MatTableModule
  ],
  declarations: []
})
export class MaterialModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
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
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
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
    MatTableModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTabsModule,
    MatExpansionModule,
    MatBadgeModule,
    MatChipsModule,
    MatRippleModule,
    MatSlideToggleModule
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
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
    MatTableModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTabsModule,
    MatExpansionModule,
    MatBadgeModule,
    MatChipsModule,
    MatRippleModule,
    MatSlideToggleModule
  ],
  declarations: []
})
export class MaterialModule { }

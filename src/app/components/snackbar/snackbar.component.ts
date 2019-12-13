import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {
  public centered = true;
  public disabled = false;
  public unbounded = false;

  public radius: number = 21;
  public color: string = '#32323226';

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private store: StoreService
  ) { }

  ngOnInit() {
  }

  close() {
    this.store.snackBarRef.dismiss();
  }
}

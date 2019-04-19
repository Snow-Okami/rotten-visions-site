import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

import { ActionsService } from '../../services/actions.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
  public centered = true;
  public disabled = false;
  public unbounded = false;

  public radius: number = 21;
  public color: string = '#32323226';

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private action: ActionsService
  ) { }

  ngOnInit() {
  }

  close() {
    this.action.closeSnackBar();
  }

}

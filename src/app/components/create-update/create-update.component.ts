import { Component, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import * as _ from 'lodash';

export interface Tag {
  name: string;
}

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.css']
})
export class CreateUpdateComponent {
  /**
   * @description title is going to show on the browser tab when component is loaded.
   */
  private title = 'Psynapsus - Create New Update';

  public mobileQuery: MediaQueryList;
  private progressBar;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public tags: Tag[] = [
    {name: 'Social'},
  ];

  /**
   * @description
   */
  private publish: boolean = false;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 800px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;

  ngOnInit() {
    this.progressBar = document.getElementsByClassName('progressbar')[0];
  }

  ngAfterViewInit() {

    /**
     * @description Hide Progress Bar When Page is Loaded.
     */
    this.progressBar.classList.add('hidden');
  }

  /**
   * @description add a new tag by pressing Enter or Comma.
   */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      const tag = { name: (value || '').trim() };
      
      if (!_.find(this.tags, tag)) {
        this.tags.push(tag);
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /**
   * @description remove is used to remove tags from input field.
   * @param tag is an Object contains the tag name property. 
   */
  remove(tag: Tag): void {
    _.pullAllBy(this.tags, [tag], 'name');
  }

}

import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';

import { User } from '../../interfaces/user';

import { ActionsService } from '../../services/actions.service';
import { HttpService } from '../../services/http.service';
import { StoreService } from '../../services/store.service';
import { ValidatorsService } from '../../services/validators.service';

let that: any;

export interface Tag {
  name: string;
}

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.scss']
})
export class CreateUpdateComponent {
  /**
   * @description title is going to show on the browser tab when component is loaded.
   */
  private title = 'Psynapsus - Create New Update';

  public disableClick: boolean = false;
  public mobileQuery: MediaQueryList;
  private progressBar;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public tags: Tag[] = [
    {name: 'Social'},
  ];

  /**
   * @description Form controls and Groups are as follows
   */
  public postTitle = new FormControl({ value: '', disabled: false }, [ Validators.required, this.regx.title ]);
  public postDescription = new FormControl({ value: '', disabled: false }, [ Validators.required, this.regx.description ]);
  public postPublish = new FormControl({ value: false, disabled: false });

  @ViewChild('postCreateFormElement') postCreateFormElement;
  public postForm = new FormGroup({
    title: this.postTitle,
    publish: this.postPublish,
    description: this.postDescription
  });

  public hideImage: boolean = true;
  @ViewChild('dropImage') image;
  @ViewChild('dropFile') file;

  private user: User;

  public hiddenContent: boolean = true;

  constructor(
    private action: ActionsService,
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    public page: Location,
    private router: Router,
    private http: HttpService,
    private store: StoreService,
    private regx: ValidatorsService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 800px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    that = this;
  }

  private _mobileQueryListener: () => void;

  async ngOnInit() {
    this.progressBar = document.getElementsByClassName('progressbar')[0];

    this.user = this.store.user.data;
    let r: any;

    if(!this.store.user.synced) {
      let email = atob(this.store.getCookie('ps-u-a-p'));
      r = await this.http.user(email).toPromise();
      if(r['message']['type'] !== 'error') { this.user = r['data']; }
    }

    if(this.user.capability !== 2) {
      this.router.navigate(['/dashboard/updates']);
    } else {
      this.hiddenContent = false;
    }
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

    /**
     * @description Add a TAG by pressing COMMAA or SPACE
     */ 
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

  showImage(event): void {
    let image = this.image.nativeElement;
    let file = this.file.nativeElement;
    let reader  = new FileReader();

    reader.addEventListener("load", function () {
      image['src'] = reader.result;
      that.hideImage = false;
    }, false);

    if (file['files'][0]) {
      reader.readAsDataURL(file['files'][0]);
    }
  }

  removeImage(): void {
    this.hideImage = true;
    this.image.nativeElement['src'] = '';
    this.file.nativeElement.value = null;
  }

  resetForm(): void {
    this.removeImage();
    this.tags = [];
    this.postPublish.setValue(false);
  }

  saveOrPublish(event: any) {
    if(this.postForm.valid) {
      /**
       * @description Disable buttons, inputs & enable loader.
       */
      this.disableClick = true;
      this.progressBar.classList.remove('hidden');

      /**
       * @description Create FormData to be POST to API.
       */
      let form = new FormData();
      
      /**
       * @description Append File and Tag only when they are available.
       */
      if(this.file.nativeElement['files'].length) {
        form.append('image', this.file.nativeElement['files'][0]);
      }
      if(this.tags.length) {
        form.append('tags', JSON.stringify(_.map(this.tags, 'name')));
      }

      /**
       * @description REQUIRED FromData Fields.
       */
      form.append('title', this.postForm.value.title);
      form.append('description', _.split(_.trim(this.postForm.value.description), '\n').join('<br>'));
      form.append('publish', this.postForm.value.publish);

      /**
       * @description Set form fields empty.
       */
      this.postCreateFormElement.nativeElement.reset();
      this.resetForm();

      /**
       * @description POST FormData to API.
       */
      this.http.post(form)
      .subscribe(resp => {
        if(resp['message']['type'] !== 'error') {

          /**
           * @description Show SNACK Message On Response.
           */
          let snackMessage: string = resp['data']['publish'] ? 'Update has been published successfully!' : 'Update has been saved successfully!';
          this.action.openSnackBarComponent(snackMessage, 'success');

          /**
           * @description Enable buttons & disable loader.
           */
          this.disableClick = false;
          this.progressBar.classList.add('hidden');

        } else {
          /**
           * @description Enable buttons & disable loader.
           */
          this.disableClick = false;
          this.progressBar.classList.add('hidden');
          /**
           * @description ERROR detected with API response.
           */
          this.action.openSnackBarComponent(resp['message']['text'], 'error');
        }
      });
    } else {
      this.action.openSnackBarComponent('Invalid form detected!', 'warning');
    }
  }

}

import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSnackBar, MatChipInputEvent } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';

import { HttpService } from '../../services/http.service';
import { ValidatorsService } from '../../services/validators.service';

let that;

export interface Tag {
  name: string;
}

@Component({
  selector: 'app-view-update',
  templateUrl: './view-update.component.html',
  styleUrls: ['./view-update.component.css']
})
export class ViewUpdateComponent {
  /**
   * @description title is going to show on the browser tab when component is loaded.
   */
  private title = 'Psynapsus - View or Edit Update Details';

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
  @ViewChild('dropImage') image: any;
  @ViewChild('dropFile') file: any;

  public post?: any = {
    id: '',
    publish: false,
    image: '',
    tags: '',
    title: '',
    description: '',
    createdAt: ''
  };

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    public page: Location,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpService,
    private regx: ValidatorsService,
    public snackBar: MatSnackBar,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 800px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    that = this;
  }

  private _mobileQueryListener: () => void;

  async ngOnInit() {
    this.progressBar = document.getElementsByClassName('progressbar')[0];

    let id = this.route.snapshot.paramMap.get('id');
    let r = await this.http.postDetails(id).toPromise();

    if(r['message']['type'] !== 'error') {
      let f = r['data'];

      this.postTitle.setValue(f.title);
      this.tags = JSON.parse(f.tags).map((t: string) => { return {name: t}; });
      this.postDescription.setValue(f.description);
      this.postPublish.setValue(f.publish);
      this.image.nativeElement['src'] = f.image;
      this.hideImage = false;

      this.image.nativeElement.addEventListener('load', () => {
        that.progressBar.classList.add('hidden');
      });
    }
  }

  ngAfterViewInit() {

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      direction: 'ltr',
      duration: 4000,
    });
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

  showImage(event: any): void {
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
    console.log('form submit detected!');
  }
}

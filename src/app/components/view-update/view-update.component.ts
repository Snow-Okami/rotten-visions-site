import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSnackBar, MatChipInputEvent } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';

import { User } from '../../classes/user';

import { HttpService } from '../../services/http.service';
import { StoreService } from '../../services/store.service';
import { ValidatorsService } from '../../services/validators.service';

let that: any;

export interface Tag {
  name: string;
}

export interface Post {
  createdAt?: string;
  description?: string;
  id?: string;
  image?: string;
  publish?: boolean;
  title?: string;
  tags?: string;
}

@Component({
  selector: 'app-view-update',
  templateUrl: './view-update.component.html',
  styleUrls: ['./view-update.component.scss']
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
  private postId: string;

  /**
   * @description Form controls and Groups are as follows
   */
  public postTitle = new FormControl({ value: '', disabled: false }, [ Validators.required, this.regx.title ]);
  public postDescription = new FormControl({ value: '', disabled: false }, [ Validators.required, this.regx.description ]);
  public postPublish = new FormControl({ value: false, disabled: false });

  @ViewChild('postCreateFormElement') postCreateFormElement: any;
  public postForm = new FormGroup({
    title: this.postTitle,
    publish: this.postPublish,
    description: this.postDescription
  });

  public hideImage: boolean = true;
  @ViewChild('dropImage') image: any;
  @ViewChild('dropFile') file: any;

  private user: User;

  public hiddenContent: boolean = true;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    public page: Location,
    private router: Router,
    private route: ActivatedRoute,
    private store: StoreService,
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

    this.user = this.store.user.data;
    let r: any;

    if(!this.store.user.synced) {
      let email = atob(this.store.getCookie('ps-u-a-p'));
      r = await this.http.user(email).toPromise();
      if(r['message']['type'] !== 'error') { this.user = r['data']; }
    }

    if(this.user.capability !== 2) {
      this.router.navigate(['/dashboard/updates']);
      return;
    }

    this.hiddenContent = false;

    this.postId = this.route.snapshot.paramMap.get('id');
    r = await this.http.postDetails(this.postId).toPromise();

    if(r['message']['type'] !== 'error') {
      let f: Post = {tags: '[]'}; Object.assign(f, r['data']);

      this.postTitle.setValue(f.title);
      this.tags = _.map(JSON.parse(f.tags), (t: string) => { return {name: t}; });
      this.postDescription.setValue(f.description);
      this.postPublish.setValue(f.publish);
      if(f.image !== '') { this.image.nativeElement['src'] = f.image; this.hideImage = false; this.image.nativeElement.addEventListener('load', () => { that.progressBar.classList.add('hidden'); }); }
    }
    that.progressBar.classList.add('hidden');
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

  async saveOrPublish(event: any) {
    if(this.postForm.invalid) {
      this.openSnackBar('Invalid form detected!', ''); return;
    }

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
    if(!this.hasImage(this.image.nativeElement['src'])) {
      form.append('image', '');
    } else if(this.hasImage(this.image.nativeElement['src']) && this.file.nativeElement['files'].length) {
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
    this.file.nativeElement.value = null;

    let r = await this.http.updatePost({id: this.postId}, form).toPromise();

    this.disableClick = false;
    this.progressBar.classList.add('hidden');

    if(r['message']['type'] !== 'error') {
      this.openSnackBar('Post has been updated successfully!', '');
    } else {
      this.openSnackBar(r['message']['text'], '');
    }
  }

  hasImage(url: string): boolean {
    let ao = ['https://res.cloudinary.com/', 'data:image/png;base64'];    
    return _.find(ao, o => { return url.includes(o); }) ? true : false;
  }
}

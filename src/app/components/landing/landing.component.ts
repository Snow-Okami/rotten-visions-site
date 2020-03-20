import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  /**
   * @description title is going to show on the browser tab when component is loaded.
   */
  private title = 'Psynapsus - Admin Panel Login';

  public mobileQuery: MediaQueryList;
  private progressBar;

  /**
   * @description Login or Signup Interface. 
   */
  public login = true;

  @ViewChild('dropFile') file: any;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    private http: HttpService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 849px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.progressBar = document.getElementsByClassName('progressbar')[0];
  }

  ngAfterViewInit() {
    this.progressBar.classList.add('hidden');
  }

  private _mobileQueryListener: () => void;

  showImage(event: any): void {
    let file = this.file.nativeElement;
    let reader  = new FileReader();

    if (file['files'][0]) {
      reader.readAsDataURL(file['files'][0]);
    }
  }

  async onUpload() {
    let f = new FormData();
    f.append('media', this.file.nativeElement['files'][0]);

    let a = await this.http.uploadMedia(f).toPromise();

    console.log('FILE UPLOAD RESPONSE', a);
  }

}

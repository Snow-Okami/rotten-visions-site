import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import * as _ from 'lodash';

let that;

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.css']
})
export class UpdatesComponent {
  public title = 'Rotten Visions | Updates';
  public mobileQuery: MediaQueryList;
  private lastScrollTop = 0;
  private postLimit = 3;
  public image = {
    offset: 100,
    defaultImage: '/assets/logo/small-logo.png'
  };
  private array = [
    {
      title: 'UNTITLED SCIFI GAME',
      comment: 'NO COMMENTS',
      description: 'So our game currently has the code name Untitled SciFi Game or (USG) for short. Anyone who can get the reference to that one will get their name in the credits. When we decided on the studio name, we also decided on a game name. After many name generators and deliberation as well as combining words together we finally came to the agreement on Desysia. It came about from a word combiner that we edited together. The middle word is pretty tough to get, but the starting word and ending word should be ones everyone knows. Perhaps later on in the stages of the game we will hold a contest to see if anyone can figure it out!',
      image: 'http://rottenvisions.com/wp-content/uploads/2014/10/the-corridor.png',
    },
    { 
      title: 'MOVING TO UNITY PRO',
      comment: 'NO COMMENTS',
      description: 'We are currently in the midst of buying Unity Pro and really giving it our all for the big time. We hope this big decision we are making further lights the fire under us and pushes us to do bigger and better things.',
      image: 'http://rottenvisions.com/wp-content/uploads/2014/10/photo.png',
    },
    { 
      title: 'WE SETTLED ON A NAME!',
      comment: 'NO COMMENTS',
      description: 'Today was a momentous day for us here at Rotten Visions. For one, we are now Rotten Visions! It took us nearly 8 months to settle on something but we finally did. Originally we were Wolf ‘N’ Kit, but we decided as time progressed that our team might grow bigger and we don’t want to be the next Ben & Jerry or Baskin-Robbins. We want a name that is representative of all members of our team as a whole, and not just us. If everyone is going to be putting in an equal amount of work then they should have that credit by being contained as one entity. Thus we have now made the final name switch. To seal the deal we set up this website and registered the domain name. Now we are locked in. Here is hoping for bigger and better things as time moves on.',
      image: 'http://rottenvisions.com/wp-content/uploads/2014/10/Hello-my-name-is.jpg',
    },
  ];
  public postList = [];
  @ViewChild('loadScroll') loadScroll: any;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    that = this;

    this.postList = Object.assign([], this.array);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    document.getElementsByClassName('route-progress-bar')[0].classList.add('hidden');
    window.addEventListener('scroll', this.onScrollDown, false);
  }

  private _mobileQueryListener: () => void;

  /**
   * @description Detect scroll direction. Returns true if down or false.
   */
  isScrollDown() {
    let st = window.pageYOffset || document.documentElement.scrollTop;
    let type = st > this.lastScrollTop ? true : false;
    this.lastScrollTop = st <= 0 ? 0 : st;
    return type;
  }

  /**
   * @description Function called when scrolled to bottom.
   */
  onScrollDown(e) {
    /**
     * @description wh is window height
     * eb is element's bottom
     */
    let wh = window.innerHeight, eb = that.loadScroll.nativeElement.getBoundingClientRect().top - 80;
    if(that.isScrollDown() && wh >= eb) {
      window.removeEventListener('scroll', that.onScrollDown);
      setTimeout(() => { that.loadMore(); }, 2000);
    }
  }

  /**
   * @description Loads data after scroll ends.
   */
  loadMore() {
    this.postList = _.concat(this.postList, this.array);
    window.addEventListener('scroll', this.onScrollDown, false);
  }

}


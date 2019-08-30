import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOwnAchievementsComponent } from './view-own-achievements.component';

describe('ViewOwnAchievementsComponent', () => {
  let component: ViewOwnAchievementsComponent;
  let fixture: ComponentFixture<ViewOwnAchievementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOwnAchievementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOwnAchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

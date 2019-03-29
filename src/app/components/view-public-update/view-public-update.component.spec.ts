import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPublicUpdateComponent } from './view-public-update.component';

describe('ViewPublicUpdateComponent', () => {
  let component: ViewPublicUpdateComponent;
  let fixture: ComponentFixture<ViewPublicUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPublicUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPublicUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUpdateComponent } from './view-update.component';

describe('ViewUpdateComponent', () => {
  let component: ViewUpdateComponent;
  let fixture: ComponentFixture<ViewUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed, inject } from '@angular/core/testing';

import { ActionsService } from './actions.service';

describe('ActionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActionsService]
    });
  });

  it('should be created', inject([ActionsService], (service: ActionsService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { RegxFormService } from './regx-form.service';

describe('RegxFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegxFormService]
    });
  });

  it('should be created', inject([RegxFormService], (service: RegxFormService) => {
    expect(service).toBeTruthy();
  }));
});

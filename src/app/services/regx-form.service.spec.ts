import { TestBed } from '@angular/core/testing';

import { RegxFormService } from './regx-form.service';

describe('RegxFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegxFormService = TestBed.get(RegxFormService);
    expect(service).toBeTruthy();
  });
});

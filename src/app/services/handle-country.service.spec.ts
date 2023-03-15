import { TestBed } from '@angular/core/testing';

import { HandleCountryService } from './handle-country.service';

describe('HandleCountryService', () => {
  let service: HandleCountryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleCountryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

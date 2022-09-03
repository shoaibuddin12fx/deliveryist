import { TestBed } from '@angular/core/testing';

import { DriverApiService } from './driver-api.service';

describe('DriverApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DriverApiService = TestBed.get(DriverApiService);
    expect(service).toBeTruthy();
  });
});

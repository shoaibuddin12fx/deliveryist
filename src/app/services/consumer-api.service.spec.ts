import { TestBed } from '@angular/core/testing';

import { ConsumerApiService } from './consumer-api.service';

describe('ConsumerApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsumerApiService = TestBed.get(ConsumerApiService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CommonServicesService } from './common-services.service';

describe('CommonServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonServicesService = TestBed.get(CommonServicesService);
    expect(service).toBeTruthy();
  });
});

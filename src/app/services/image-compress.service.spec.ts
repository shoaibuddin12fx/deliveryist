import { TestBed } from '@angular/core/testing';

import { ImageCompressService } from './image-compress.service';

describe('ImageCompressService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageCompressService = TestBed.get(ImageCompressService);
    expect(service).toBeTruthy();
  });
});

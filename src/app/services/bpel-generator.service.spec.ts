import { TestBed } from '@angular/core/testing';

import { BpelGeneratorService } from './bpel-generator.service';

describe('BpelGeneratorService', () => {
  let service: BpelGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BpelGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MediateurService } from './mediateur.service';

describe('MediateurService', () => {
  let service: MediateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed, inject } from '@angular/core/testing';

import { GolfersService } from './golfers.service';

describe('GolfersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GolfersService]
    });
  });

  it('should be created', inject([GolfersService], (service: GolfersService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, async, inject } from '@angular/core/testing';

import { AuthVideoGuard } from './auth-video.guard';

describe('AuthVideoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthVideoGuard]
    });
  });

  it('should ...', inject([AuthVideoGuard], (guard: AuthVideoGuard) => {
    expect(guard).toBeTruthy();
  }));
});

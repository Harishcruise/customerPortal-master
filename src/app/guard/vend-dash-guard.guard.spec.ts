import { TestBed } from '@angular/core/testing';

import { VendDashGuardGuard } from './vend-dash-guard.guard';

describe('VendDashGuardGuard', () => {
  let guard: VendDashGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VendDashGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

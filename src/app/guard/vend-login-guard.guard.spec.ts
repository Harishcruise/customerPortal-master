import { TestBed } from '@angular/core/testing';

import { VendLoginGuardGuard } from './vend-login-guard.guard';

describe('VendLoginGuardGuard', () => {
  let guard: VendLoginGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VendLoginGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

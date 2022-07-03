import { TestBed } from '@angular/core/testing';

import { EmpLoginGuardGuard } from './emp-login-guard.guard';

describe('EmpLoginGuardGuard', () => {
  let guard: EmpLoginGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmpLoginGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

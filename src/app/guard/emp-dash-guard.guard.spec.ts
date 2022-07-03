import { TestBed } from '@angular/core/testing';

import { EmpDashGuardGuard } from './emp-dash-guard.guard';

describe('EmpDashGuardGuard', () => {
  let guard: EmpDashGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmpDashGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

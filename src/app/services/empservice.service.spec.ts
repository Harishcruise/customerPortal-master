/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmpserviceService } from './empservice.service';

describe('Service: Empservice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmpserviceService]
    });
  });

  it('should ...', inject([EmpserviceService], (service: EmpserviceService) => {
    expect(service).toBeTruthy();
  }));
});

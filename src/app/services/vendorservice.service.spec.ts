/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VendorserviceService } from './vendorservice.service';

describe('Service: Vendorservice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VendorserviceService]
    });
  });

  it('should ...', inject([VendorserviceService], (service: VendorserviceService) => {
    expect(service).toBeTruthy();
  }));
});

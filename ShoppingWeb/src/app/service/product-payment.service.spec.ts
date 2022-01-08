import { TestBed } from '@angular/core/testing';

import { ProductPaymentService } from './product-payment.service';

describe('ProductPaymentService', () => {
  let service: ProductPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

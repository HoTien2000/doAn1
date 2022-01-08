import { TestBed } from '@angular/core/testing';

import { PasswordResetTokenService } from './password-reset-token.service';

describe('PasswordResetTokenService', () => {
  let service: PasswordResetTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordResetTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { QrGenerator } from './qr-generator';

describe('QrGenerator', () => {
  let service: QrGenerator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrGenerator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

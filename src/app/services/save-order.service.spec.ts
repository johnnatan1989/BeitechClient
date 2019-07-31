import { TestBed } from '@angular/core/testing';

import { SaveOrderService } from './save-order.service';

describe('SaveOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveOrderService = TestBed.get(SaveOrderService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { InnerGuard } from './inner.guard';

describe('InnerGuard', () => {
  let guard: InnerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InnerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

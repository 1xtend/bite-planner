import { TestBed } from '@angular/core/testing';

import { BreakpointObserver } from './breakpoint-observer.service';

describe('BreakpointObserverService', () => {
  let service: BreakpointObserver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreakpointObserver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

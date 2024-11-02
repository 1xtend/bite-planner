import { fakeAsync, flush, TestBed } from '@angular/core/testing';

import { BreakpointObserver } from './breakpoint-observer.service';
import { Breakpoint } from '../../shared/models/types/breakpoint.type';
import { take } from 'rxjs';

describe('BreakpointObserverService', () => {
  let service: BreakpointObserver;
  const breakpoints: { [K in Breakpoint]: number } = {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  };

  function setWindowWidth(width: number): void {
    Object.assign(window, {
      ...window,
      innerWidth: width
    });
  }

  function testBreakpoint(expectedValue: Breakpoint, width: number, breakpoints?: Breakpoint | Breakpoint[]): void {
    setWindowWidth(width);

    service.observe(breakpoints).pipe(take(1)).subscribe((value) => {
      expect(value).toBe(expectedValue);
    });

    window.dispatchEvent(new Event('resize'));

    flush();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreakpointObserver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return breakpoints when getBreakpoints is called', () => {
    expect(service.getBreakpoints()).toEqual(breakpoints);
  });

  describe('when observe is called', () => {
    it('should emit sm breakpoint on window resize', fakeAsync(() => {
      testBreakpoint('sm', 500);
    }));

    it('should emit md breakpoint on window resize', fakeAsync(() => {
      testBreakpoint('md', 800);
    }));

    it('should emit lg breakpoint on window resize', fakeAsync(() => {
      testBreakpoint('lg', 1000);
    }));

    it('should emit xl breakpoint on window resize', fakeAsync(() => {
      testBreakpoint('xl', 1300);
    }));

    it('should emit only provided breakpoints', fakeAsync(() => {
      testBreakpoint('lg', 1000, 'lg');
      testBreakpoint('sm', 400, ['sm', 'md']);
    }));
  });
});
